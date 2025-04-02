<script setup lang="ts">
defineProps<{
  participants: any[]
}>()
</script>

<template lang="pug">
.participants
  h2 Participants
  ul.participants__list
    li.participants__list__item(v-for="(part, i) in participants" :key="part.id")
      h3 {{ part.name }}
</template>

<style scoped></style>
