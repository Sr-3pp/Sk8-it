export default defineEventHandler(async (event) => {
  deleteCookie(event, 'token')

  return true
})
