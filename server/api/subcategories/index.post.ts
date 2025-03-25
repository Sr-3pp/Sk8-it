export default defineEventHandler(async (event) => {
  const data = await readBody(event)
  const subcategory = await useDrizzle()
    .insert(tables.Subcategory)
    .values(data)
    .returning()
    .get()

  return {
    data: subcategory,
  }
})
