// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    viewTransition: true
  },
  runtimeConfig: {
    public: {
      geoapifyApiKey: process.env.GEOAPIFY_TOKEN!,
      turso: {
        databaseUrl: process.env.NODE_ENV === 'production' ? process.env.NUXT_TURSO_DATABASE_URL! : process.env.NUXT_TURSO_DEV_DATABASE_URL!,
        authToken: process.env.NUXT_TURSO_AUTH_TOKEN!
      },
      r2: {
        endpoint: process.env.R2_ENDPOINT,
        token: process.env.R2_TOKEN,
        accessKey: process.env.R2_ACCESS_KEY,
        secretKey: process.env.R2_SECRET_KEY,
        bucket:  process.env.NODE_ENV === 'production' ? process.env.R2_BUCKET_NAME : process.env.R2_DEV_BUCKET_NAME
      }
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxtjs/leaflet',
    'nuxt-swiper',
    '@pinia/nuxt'
  ],

  css: [
    '~/assets/scss/main.scss',
    'normalize.css/normalize.css'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/assets/scss/utils/tokens.scss" as *;
          @use "~/assets/scss/utils/unit.scss" as *;
          @use "~/assets/scss/utils/invertedRadius.scss" as *;
          `
        }
      }
    }
  },

  pinia: {
    autoImports: [
      "defineStore"
    ]
  }
})