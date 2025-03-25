export default defineEventHandler(async (event) => {
  const { type } = getRouterParams(event)
  const blobs = await useHubBlob().list({ prefix: type, limit: 10 })
  return {
    data: blobs,
  }
})
