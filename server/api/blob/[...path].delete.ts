export default defineEventHandler(async (event) => {
  const { path } = getRouterParams(event)
  await useHubBlob().del(path)

  return {
    message: `Blob ${path} deleted`,
  }
})
