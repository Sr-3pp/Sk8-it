export default defineEventHandler(async (event) => {
  const { skus } = await readBody(event)
  const drizzle = useDrizzle()
  const products = await drizzle.query.Product.findMany({
     with: {
      category: true,
      subcategory: true,
      boards: true,
      clothes: true,
    },
    where: (product, { inArray }) => inArray(product.sku, skus),
  })

  if (!products || products.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Products not found',
    })
  }

  return products
})
