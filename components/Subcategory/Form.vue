<script setup lang="ts">
import type { Category } from '~~/server/utils/drizzle'

const props = defineProps<{
  categories: Category[]
}>()

const currentCategory = computed(
  () => (props.categories[0] as { id: number }).id,
)

const newSubcategory = ref({
  name: '',
})

const emit = defineEmits(['add-subcategory', 'get-subcategories'])

const handleSubcategory = async () => {
  if (!newSubcategory.value.name) return

  const { data: subcategory } = await $fetch('/api/subcategories', {
    method: 'POST',
    body: {
      name: newSubcategory.value.name,
      category: currentCategory.value,
    },
  })

  emit('add-subcategory', subcategory)
  newSubcategory.value.name = ''
}
</script>

<template>
  <form @submit.prevent="handleSubcategory">
    <label>
      <span>Name</span>
      <input v-model="newSubcategory.name" type="text" />
    </label>
    <label>
      <span>Category</span>
      <select
        v-model="currentCategory"
        @change="$emit('get-subcategories', currentCategory)"
      >
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </label>
    <button>Add subcategory</button>
  </form>
</template>

<style scoped></style>
