export default defineEventHandler(async (event) => {
  const data = await readBody(event)
  const category = await useDrizzle()
    .insert(tables.Category)
    .values(data)
    .returning()
    .get()

  return {
    data: category,
  }
})
