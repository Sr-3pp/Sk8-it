export default defineEventHandler(async (event) => {
  const { id } = await readBody(event)

  const category = await useDrizzle()
    .delete(tables.Category)
    .where(eq(tables.Category.id, id))
    .returning()
    .get()

  return {
    data: category,
  }
})
