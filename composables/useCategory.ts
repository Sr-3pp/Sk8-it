import type { Category } from '~~/server/utils/drizzle'

export const useCategory = () => {
  const getCategories = () => useAsyncData<Category[]>('categories', () => $fetch('/api/categories'))

  const addCategory = async (category: Category) => {
    const { data } = await $fetch('/api/categories', {
      method: 'POST',
      body: category,
    })

    if (data) {
      return data as Category
    }
  }

  const deleteCategory = async ({ id, idx }: { [key: string]: number }) => {
    const { data } = await $fetch(`/api/categories`, {
      method: 'DELETE',
      body: { id },
    })

    if (data) {
      return true;
    }
  }

  const getCategoryById = (id: number) => useAsyncData<Category>(`category-${id}`, () => $fetch(`/api/categories/${id}`))

  return {
    getCategories,
    addCategory,
    deleteCategory,
    getCategoryById,
  }
}
