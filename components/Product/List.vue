<script setup lang="ts">
import type { Product } from '~~/server/utils/drizzle'

const deleting = ref(false)

const { deleteProduct } = await useProduct()

defineProps<{
  editable?: boolean,
  products: (Product & {
    category?: { name: string },
    board?: { description: string, size: string, shape: string },
    clothe?: { description: string, size: string, color: string }
  })[]
}>()

const emit = defineEmits(['product-detail', 'product-delete'])

const getThumb = (thumbs: string) => {
  return JSON.parse(thumbs)[0] || 'https://picsum.photos/300'
}

const handleDelete = async (id: number, idx: number) => {
  deleting.value = true
  await deleteProduct(id)
  emit('product-delete', idx)
  deleting.value = false
}
</script>

<template lang="pug">
ul
  li(v-for="(product, idx) in products" :key="product.id")
    NuxtImg(:src="getThumb(product.thumbs)" :alt="product.name" width="100" height="100")
    | {{ product.sku }} | {{ product.name }}
    button(v-if="editable" @click="$emit('product-detail', product)") Detail

    button(v-if="editable" :disabled="deleting" @click="handleDelete(product.id, idx)") delete
</template>

<style scoped></style>
