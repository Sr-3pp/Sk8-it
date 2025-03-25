export default defineEventHandler(async (event) => {
  const { id } = await readBody(event)

  console.log('delete this id: ', id)

  const deletedContest = await useDrizzle().delete(tables.Contest).where(and(
    eq(tables.Contest.id, Number(id)),
  )).returning().get()

  if (!deletedContest) {
    throw createError({
      statusCode: 404,
      message: 'Todo not found',
    })
  }
  return deletedContest
})
