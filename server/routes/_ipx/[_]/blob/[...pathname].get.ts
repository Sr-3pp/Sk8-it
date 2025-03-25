export default eventHandler(async (event) => {
  const { pathname } = getRouterParams(event)
  try {
    return useHubBlob().serve(event, pathname)
  } catch (error) {
    console.error(error)
    return 'https://picsum.photos/200'
  }
})
