<script setup lang="ts">
defineProps<{
  podium: any[]
}>()
</script>

<template lang="pug">
.podium
  h2 Podium
  ul.podium__list
    li.podium__list__item(v-for="(podium, i) in podium" :key="podium.id")
      span {{ i + 1 }}
      h3 {{ podium.name }}
</template>

<style scoped></style>
