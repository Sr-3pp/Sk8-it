export default defineEventHandler(async () => {
  const subcategories = await useDrizzle()
    .select()
    .from(tables.Subcategory)
    .all()
  return subcategories as Subcategory[]
})
