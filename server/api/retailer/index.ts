export default defineEventHandler(async (event) => {
  const { limit = 10, page = 0 } = await getQuery(event)

  const drizzle = useDrizzle()

  const retailer = await drizzle.query.Retailer.findMany({
    with:{
      category: true,
      products: true,
    },
    limit: Number(limit),
    offset: (Number(page) - 1) * Number(limit),
  })

  return retailer
})
