export default defineEventHandler(async (event) => {
  const { id, category } = await readBody(event)
  const db = useDrizzle()

  try {
    await db.delete(tables[category as 'Board' | 'Clothe'])
      .where(eq(tables[category as 'Board' | 'Clothe'].id, id))
      .run()

    return { success: true }
  } catch (error) {
    console.error('Error deleting model:', error)
    return { success: false, error: 'Failed to delete model' }
  }
})
