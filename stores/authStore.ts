export const useAuthStore = defineStore('auth', () => {
  // Use the built-in `useCookie` composable to store the JWT token
  const tokenCookie = useCookie<string | null>('token', {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  })

  const isAuthenticated = computed(() => !!tokenCookie.value)

  const login = async (credentials: { email: string; password: string }) => {
    try {
      // Call your backend API for login
      const response = await $fetch<{ token: string }>('/api/users/auth', {
        method: 'POST',
        body: credentials,
      })

      tokenCookie.value = response.token // Store JWT in a cookie
    } catch (error) {
      console.error('Login failed:', error)
      throw new Error('Invalid login credentials')
    }
  }

  const logout = async () => {
    tokenCookie.value = null // Clear the JWT cookie on logout
    await $fetch('/api/users/logout')
  }

  // Optional: Fetch user information using the JWT
  const user = computed(() => {
    if (!tokenCookie.value) return null
    try {
      const token = String(tokenCookie.value).split('.')
      const payload = JSON.parse(atob(token[1] as string))

      return payload // Adjust according to your JWT structure
    } catch (e) {
      console.error('Failed to parse JWT:', e)
      return null
    }
  })

  return {
    token: tokenCookie,
    isAuthenticated,
    user,
    login,
    logout,
  }
})
