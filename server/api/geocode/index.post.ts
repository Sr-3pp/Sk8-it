const { public: config } = useRuntimeConfig()
export default defineEventHandler(async (event) => {
  const { address } = await readBody(event)

  const response = await $fetch(`https://api.geoapify.com/v1/geocode/search?text=${address.replace(/ /g, '%20')}&apiKey=${config.geoapifyApiKey}`)

  return response
})
