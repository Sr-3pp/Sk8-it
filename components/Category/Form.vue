<script setup lang="ts">
const newCategory = ref({
  name: '',
})
const emit = defineEmits(['add-category'])

const handleCategory = async () => {
  if (!newCategory.value.name) return

  const { data: category } = await $fetch('/api/categories', {
    method: 'POST',
    body: newCategory.value,
  })

  emit('add-category', category)
  newCategory.value.name = ''
}
</script>

<template>
  <form @submit.prevent="handleCategory">
    <label>
      <span>Name</span>
      <input v-model="newCategory.name" type="text" />
    </label>
    <button>Add category</button>
  </form>
</template>

<style scoped></style>
