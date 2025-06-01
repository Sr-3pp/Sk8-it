export default defineEventHandler(async (event) => {
  const { limit = 10, page = 0 } = await getQuery(event)

  const drizzle = useDrizzle()

  const outlets = await drizzle.query.Outlet.findMany({
    limit: Number(limit),
    offset: (Number(page) - 1) * Number(limit),
  })

  return {
    data: outlets as Outlet[],
  }
})
