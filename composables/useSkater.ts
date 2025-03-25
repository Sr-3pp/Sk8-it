export const useSkater = () => {
  const getSkaters = () => useAsyncData(async () => {
    const collections = await queryCollection('content').all()
    return collections.filter((collection: { path: string }) => collection.path.includes('team/'))
  })

  const deleteSkater = async (id: string, _idx: number) => {
    await $fetch(`/api/skaters`, {
      method: 'DELETE',
      body: { id },
    })
  }

  const addSkater = () => {

  }

  return {
    getSkaters,
    deleteSkater,
    addSkater,
  }
}
