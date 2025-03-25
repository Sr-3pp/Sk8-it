<script setup lang="ts">
defineProps<{
  name: string
  logo: string
  country?: string
  social?: {
    instagram?: string
    twitter?: string
    facebook?: string
    website?: string
  } 
}>()
</script>

<template lang="pug">
article.brand-card
  figure.brand-card__image
    img.picture(:src="logo" :alt="name")
  h3.brand-card__title {{ name }}
  div.brand-card__info(v-if="country")
    p Country: {{ country }}
</template>

<style scoped lang="scss">
.brand-card {
  --border-color: #{$color-board};
  --border-width: unit(4);
  width: 100%;
  display: flex;
  flex-direction: column;
  color: $color-primary-text-light;
  background-color: $color-primary-bg-dark;
  border: {
    width: var(--border-width);
    style: solid;
    color: var(--border-color);
    radius: unit(16);
  }
}
</style>
