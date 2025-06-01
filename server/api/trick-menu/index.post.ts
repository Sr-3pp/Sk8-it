export default defineEventHandler(async (event) => {
  const data = await readBody(event)

  const [newTrick] = await useDrizzle()
    .insert(tables.TrickMenu)
    .values(data)
    .returning()

  return newTrick
})
