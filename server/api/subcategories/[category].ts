export default defineEventHandler(async (event) => {
  const { category } = getRouterParams(event)

  const subcategories = await useDrizzle()
    .select()
    .from(tables.Subcategory)
    .where(eq(tables.Subcategory.categoryId, category))
    .all()

  return {
    data: subcategories,
  }
})
