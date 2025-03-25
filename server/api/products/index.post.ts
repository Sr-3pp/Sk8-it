export default defineEventHandler(async (event) => {
  const requestData = await readBody(event)
  const productData = requestData.product
  const modelData = requestData.model

  const product = await useDrizzle().insert(tables.Product).values(productData).returning().get()

  modelData.forEach((item: { productId: number }) => item.productId = product.id)

  const modelType: 'Board' | 'Clothe' = product.categoryId == 1 ? 'Board' : 'Clothe'

  await useDrizzle().insert(tables[modelType]).values(modelData).run()

  return {
    data: product,
  }
})
