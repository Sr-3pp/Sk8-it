export default defineEventHandler(async (event) => {
  const tricks = await useDrizzle()
    .select()
    .from(tables.TrickMenu)
    .all()
  return {
    data: tricks,
  }
})
