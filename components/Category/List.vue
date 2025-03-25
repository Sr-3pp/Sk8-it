<script setup lang="ts">
import type { Category } from '~~/server/utils/drizzle'

defineProps<{
  categories: Category[]
}>()

const emit = defineEmits(['delete-category'])

const deleteCategory = async (id: number, idx: number) => {
  emit('delete-category', { id, idx })
}
</script>

<template>
  <ul>
    <li v-for="(category, idx) in categories" :key="category.id">
      {{ category.name }}

      <button @click="deleteCategory(category.id, idx)">delete</button>
    </li>
  </ul>
</template>

<style scoped></style>
