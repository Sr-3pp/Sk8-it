<script setup lang="ts">
import type { Category, Product } from '~~/server/utils/drizzle'
import ProductForm from '~/components/Product/Form.vue'

const productForm = ref<InstanceType<typeof ProductForm> | null>(null)

const { categories } = await useCategory()

const { getSubcategories, subcategories } = await useSubcategory(
  (categories.value[0] as Category).id,
)

const { saveProduct, getProducts } = await useProduct()

const { data } = await getProducts()
const products = ref<Product[]>(data as Product[])

const handleSaveProduct = async (product: Product) => {
  const newProduct = await saveProduct(product)
  products.value.push(newProduct)
}
</script>

<template>
  <div>
    <ProductForm
      ref="productForm"
      :categories="categories"
      :subcategories="subcategories"
      @get-subcategories="getSubcategories"
      @add-product="handleSaveProduct"
    />
    <ProductList
      :products="products as Product[]"
      @product-detail="productForm!.openForm($event)"
      @product-delete="products.splice($event, 1)"
    />
  </div>
</template>

<style scoped></style>
