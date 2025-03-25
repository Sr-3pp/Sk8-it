import type { BlobType } from '~/types/blob'

export default defineEventHandler(async (event) => {
  const { ensureBlob, put } = useHubBlob()
  const { path } = getRouterParams(event)
  const form = await readFormData(event)
  const file = form.get('file') as File
  const type = form.get('type') as string

  if (!file || !file.size) {
    throw createError({ statusCode: 400, message: 'No file provided' })
  }

  const validTypes: BlobType[] = ['image', 'image/jpeg', 'image/png', 'application/pdf'] // Add all valid types
  if (!validTypes.includes(type as BlobType)) {
    throw createError({ statusCode: 400, message: 'Invalid file type' })
  }

  ensureBlob(file, {
    maxSize: '1MB',
    types: [type as BlobType],
  })

  return await put(file.name, file, {
    addRandomSuffix: false,
    prefix: path,
  })
})
