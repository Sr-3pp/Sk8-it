import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const { public: config } = useRuntimeConfig()
  const { jwtSecret } = config

  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Email and password are required',
    })
  }

  const user = await useDrizzle()
    .select()
    .from(tables.User)
    .where(eq(tables.User.email, email))
    .get()

  if (!user) {
    throw createError({ statusCode: 404, message: 'User not found' })
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    throw createError({ statusCode: 401, message: 'Invalid password' })
  }

  // Prepare JWT payload
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    // Add other relevant user properties if needed
  }

  // Retrieve JWT secret from environment variables
  const secret = jwtSecret as string
  if (!secret) {
    throw createError({
      statusCode: 500,
      message: 'JWT secret is not defined',
    })
  }

  // Sign the JWT with payload, secret, and options
  const token = jwt.sign(payload, secret, { expiresIn: '1h' })

  // Optionally, you can include the token in a cookie
  setCookie(event, 'token', token, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  })

  // Return the JWT
  return { token }
})
