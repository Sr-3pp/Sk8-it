export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const db = useDrizzle()
  const product = await db.query.Product.findFirst({
    where: eq(tables.Product.id, Number(id)),
    with: {
      category: true,
      subcategory: true,
      boards: true,
      clothes: true,
    },
  })
  return product
})
