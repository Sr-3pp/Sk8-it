export default defineEventHandler(async () => {
  const db = useDrizzle()
  const categories = await db.query.Category.findMany({
    with: {
      products: true,
      subcategories: true,
    },
  })

  return {
    data: categories,
  }
})
