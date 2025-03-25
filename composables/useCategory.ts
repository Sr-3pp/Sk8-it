import type { Category } from '~~/server/utils/drizzle'

export const useCategory = async () => {
  const { data } = await $fetch('/api/categories')
  const categories = ref(data)
  const addCategory = async (category: Category) => {
    categories.value.push(category)
  }

  const deleteCategory = async ({ id, idx }: { [key: string]: number }) => {
    const { data } = await $fetch(`/api/categories`, {
      method: 'DELETE',
      body: { id },
    })

    if (data) {
      categories.value.splice(idx as number, 1)
    }
  }

  return {
    categories,
    addCategory,
    deleteCategory,
  }
}
