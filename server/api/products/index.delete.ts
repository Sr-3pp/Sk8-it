export default defineEventHandler(async (event) => {
  const { id } = await readBody(event)
  const db = useDrizzle()
  console.log('Deleting product with id:', id)
  try {
    // Combine Board and Clothe deletions into a single batch operation
    await db.batch([
      db.delete(tables.Board).where(eq(tables.Board.productId, id)),
      db.delete(tables.Clothe).where(eq(tables.Clothe.productId, id)),
    ])

    const deletedProduct = await db.delete(tables.Product)
      .where(eq(tables.Product.id, id))
      .returning()
      .get()

    return { success: true, deletedProduct }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: 'Failed to delete product' }
  }
})
