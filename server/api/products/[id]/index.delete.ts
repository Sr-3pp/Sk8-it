export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const db = useDrizzle()
  // Delete related boards and clothes first
  await db.delete(tables.Board)
    .where(eq(tables.Board.productId, Number(id)))
    .run()

  await db.delete(tables.Clothe)
    .where(eq(tables.Clothe.productId, Number(id)))
    .run()

  const product = await db.delete(tables.Product).where(and(eq(tables.Product.id, Number(id)))).returning().get()
  return product
})
