export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const data = await readBody(event)
  console.log(id, data)
  return true
  const db = useDrizzle()
  const product = await db.update(tables.Product).set(data).where(eq(tables.Product.id, Number(id))).returning().get()
  return product
})
