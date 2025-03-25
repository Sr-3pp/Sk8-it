const { public: config } = useRuntimeConfig()
export default defineEventHandler(async (event) => {
  const { lat, lon } = await readBody(event)

  const response = await $fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${config.geoapifyApiKey}`)

  return response
})
