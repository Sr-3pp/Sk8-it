<script setup lang="ts">
import type { Category, Product } from '~~/server/utils/drizzle'
import ProductForm from '~/components/Product/Form.vue'

const productForm = ref<InstanceType<typeof ProductForm> | null>(null)

const { getCategories } = await useCategory()
const { data: categories } = await getCategories()

const { getSubcategories } = await useSubcategory()
const { data: subcategories } = await getSubcategories(categories.value![0]?.id || 0)

const { saveProduct, getProducts } = await useProduct()

const { data: products } = await getProducts()
const handleSaveProduct = async (product: Product) => {
  const newProduct = await saveProduct(product)
  products.value!.push(newProduct)
}
</script>

<template lang="pug">
.panel-products
    ProductForm(
      ref="productForm"
      :categories="categories"
      :subcategories="subcategories"
      @get-subcategories="getSubcategories"
      @add-product="handleSaveProduct"
    )
    ProductList(
      :products="products"
      @product-detail="productForm.openForm($event)"
      @product-delete="products.data.splice($event, 1)"
    )
</template>

<style lang="scss" scoped>
.panel-products{
  padding-top: 10rem;
}

</style>
