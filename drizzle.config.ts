import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'turso',
  schema: 'server/database/schema/index.ts',
  out: 'server/database/migrations',
  dbCredentials: {
    url: process.env.NODE_ENV === 'production' ? process.env.NUXT_TURSO_DATABASE_URL! : process.env.NUXT_TURSO_DEV_DATABASE_URL!,
    authToken: process.env.NUXT_TURSO_AUTH_TOKEN!,
  },
})
