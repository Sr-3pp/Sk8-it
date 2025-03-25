<script setup lang="ts">
defineProps<{
  name: string
  image: string
  date: string
  cost: number
  slug: string
}>()
</script>

<template lang="pug">
article.contest-card
  figure.contest-card__image
    img.picture(:src="image" :alt="name")
  h3.contest-card__title {{ name }}
  div.contest-card__info
    p Date: {{ date }}
    p Cost: {{ cost }}
    NuxtLink(:to="`/contest/${slug}`") More info
</template>

<style scoped></style>
