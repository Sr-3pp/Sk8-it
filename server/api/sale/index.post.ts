export default defineEventHandler(async (event) => {
  const { sale, shipping } = await readBody(event)
  const drizzle = useDrizzle()

  if (shipping) {
    //save shipping data
    const shippingData = await drizzle.insert(tables.Shipping).values(shipping).returning().get()
    //append shipping id to sale data
    sale.shippingId = shippingData.id
  }

  //save sale data
  const saleData = await drizzle.insert(tables.Sale).values(sale).returning().get()

  //update product stock
  if (sale.products && sale.products.length > 0) {
    const productUpdates = sale.products.map(async (product: { models: { boards: [{id: number, qty: number}], clothes: [{id: number, qty: number}] }, quantity: number }) => {

      for (const model of Object.entries(product.models)) {
        const [key, models] = model

        const modelKey = key == 'boards' ? "Board" : "Clothe"

        for (const value of models) {
          const currentModel = await drizzle
            .select({ stock: tables[modelKey].stock })
            .from(tables[modelKey])
            .where(eq(tables[modelKey].id, value.id))
            .get()
          
          if (currentModel) {
            const newStock = currentModel.stock - value.qty
            await drizzle
              .update(tables[modelKey])
              .set({ stock: newStock })
              .where(eq(tables[modelKey].id, value.id))
          }
        }
      }
      
      // Return null if product not found in either table
      return null
    })
    
    // Filter out null values before Promise.all
    const _ = (await Promise.all(productUpdates)).filter(update => update !== null)
  }

  return {
    data: saleData,
  }
})
