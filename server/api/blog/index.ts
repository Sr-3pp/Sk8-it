export default defineEventHandler(async () => {
  const blog = await useDrizzle().select().from(tables.Blog).all()
  return blog
})
