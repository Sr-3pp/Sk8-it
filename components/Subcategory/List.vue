<script setup lang="ts">
import type { Subcategory } from '~~/server/utils/drizzle'

defineProps<{
  subcategories: Subcategory[]
}>()
</script>

<template>
  <div>
    <ul>
      <li v-for="subcategory in subcategories" :key="subcategory.id">
        {{ subcategory.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
