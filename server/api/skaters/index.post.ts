export default defineEventHandler(async (event) => {
  const skaterData = await readBody(event)
  const skater = await useDrizzle()
    .insert(tables.Skater)
    .values(skaterData)
    .returning()
    .get()

  return {
    data: skater,
  }
})
