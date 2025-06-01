import type { Subcategory } from '~~/server/utils/drizzle'

export const useSubcategory = () => {
  const addSubcategory = async (category: Subcategory) => {
    const { data } = await $fetch('/api/subcategories', {
      method: 'POST',
      body: category,
    })

    if (data) {
      return data as Subcategory
    }
  }

  const deleteSubcategory = async ({ id, idx }: { [key: string]: number }) => {
    const { data } = await $fetch(`/api/subcategories`, {
      method: 'DELETE',
      body: { id },
    })

    if (data) {
      return true
    }
  }

  const getSubcategories = (categoryId: string | number) => useAsyncData<Subcategory[]>('subcategories', () => $fetch(`/api/subcategories/${categoryId}`))

  return {
    addSubcategory,
    deleteSubcategory,
    getSubcategories,
  }
}
