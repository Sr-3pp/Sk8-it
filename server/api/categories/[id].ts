export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, 'id')

  const drizzle = useDrizzle()
  const category = await drizzle.query.Category.findFirst({
    where: eq(tables.Product.id, Number(id))
  })
  
  if (!category) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Category not found',
    })
  }

  return category
})
