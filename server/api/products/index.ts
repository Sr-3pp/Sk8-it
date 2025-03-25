export default defineEventHandler(async (event) => {
  const { limit = 10, page = 0 } = await getQuery(event)

  const drizzle = useDrizzle()

  const products = await drizzle.query.Product.findMany({
    with: {
      category: true,
      subcategory: true,
      boards: true,
      clothes: true,
    },
    limit: Number(limit),
    offset: (Number(page) - 1) * Number(limit),
  })

  return {
    data: products as Product[],
  }
})
