export default defineEventHandler(async (event) => {
  const { id } = await readBody(event)
  const skater = await useDrizzle()
    .delete(tables.Skater)
    .where(eq(tables.Skater.id, id))
    .returning()
    .get()

  if (!skater) {
    throw createError({ statusCode: 404, message: 'Skater not found' })
  }

  return {
    data: skater,
  }
})
