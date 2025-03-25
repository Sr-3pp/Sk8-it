<script setup lang="ts">
import type { Product } from '~~/server/utils/drizzle'

const deleting = ref(false)

const { deleteProduct } = await useProduct()

defineProps<{
  products: (Product & {
    category?: { name: string },
    board?: { description: string, size: string, shape: string },
    clothe?: { description: string, size: string, color: string }
  })[]
}>()

const emit = defineEmits(['product-detail', 'product-delete'])

const handleDelete = async (id: number, idx: number) => {
  deleting.value = true
  await deleteProduct(id)
  emit('product-delete', idx)
  deleting.value = false
}
</script>

<template>
  <ul>
    <li v-for="(product, idx) in products" :key="product.id">
      {{ product.id }} - {{ product.name }}
      <button @click="$emit('product-detail', product)">
        Detail
      </button>

      <button :disabled="deleting" @click="handleDelete(product.id, idx)">
        delete
      </button>
    </li>
  </ul>
</template>

<style scoped></style>
