export default defineEventHandler(async (event) => {
  const { limit = 10, page = 0 } = await getQuery(event)

  const drizzle = useDrizzle()

  const sales = await drizzle.query.Sale.findMany({
    with:{
      shipping: true,
      outlet: true,
    },
    limit: Number(limit),
    offset: (Number(page) - 1) * Number(limit),
  })

  return sales as Sale[]
})
