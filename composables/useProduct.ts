import type { Product } from '~~/server/utils/drizzle'

export const useProduct = () => {
  const getProducts = () => $fetch('/api/products')
  const getProduct = (id: number) => $fetch('/api/products/' + id)
  const getHighlights = () => $fetch('/api/products?limit=3')

  const deleteProduct = async (productId: number) => {
    const deletedProduct = await $fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    })
    return deletedProduct
  }

  const saveProduct = async (data: { name: string }) => {
    const { data: product } = await $fetch('/api/products', {
      method: 'POST',
      body: data,
    })

    return product
  }

  const deleteModel = (productId: number, ModelId: number, ModelType: string) => {
    const product = $fetch(`/api/products/model/${ModelId}`, {
      method: 'DELETE',
      body: { productId, ModelType },
    })

    return product
  }

  const updateProduct = async (product: Product) => {
    const updatedProduct = await $fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      body: product,
    })

    return updatedProduct
  }

  return {
    getProducts,
    getHighlights,
    deleteProduct,
    saveProduct,
    deleteModel,
    updateProduct,
    getProduct,
  }
}
