import type { Subcategory } from '~~/server/utils/drizzle'

export const useSubcategory = async (categoryId: number) => {
  const { data } = await $fetch<{ data: Subcategory[] }>(
    '/api/subcategories/' + categoryId,
  )
  const subcategories = ref(data)
  const addSubcategory = async (category: Subcategory) => {
    ;(subcategories.value as Subcategory[]).push(category)
  }

  const deleteSubcategory = async ({ id, idx }: { [key: string]: number }) => {
    const { data } = await $fetch(`/api/subcategories`, {
      method: 'DELETE',
      body: { id },
    })

    if (data) {
      subcategories.value.splice(idx as number, 1)
    }
  }

  const getSubcategories = async (categoryId: number) => {
    const { data } = await $fetch(`/api/subcategories/${categoryId}`)
    subcategories.value = data
  }

  return {
    subcategories,
    addSubcategory,
    deleteSubcategory,
    getSubcategories,
  }
}
