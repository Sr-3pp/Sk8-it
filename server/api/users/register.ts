import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const { name, email, password, role } = await readBody(event)

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await useDrizzle()
    .insert(tables.User)
    .values({ name, role, email, password: hashedPassword })

  return {
    data: user,
  }
})
