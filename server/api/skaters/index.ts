export default defineEventHandler(async () => {
  const skaters = await useDrizzle().select().from(tables.Skater).all()
  return {
    data: skaters,
  }
})
