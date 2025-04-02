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
  div.brand-card__info
    h3.brand-card__title {{ name }}
    p(v-if="country") Country: {{ country }}
    ul.brand-card__social(v-if="social")
      li(v-for="key in Object.keys(social)" :key="key")
        a(:href="social[key]" target="_blank")
          Icon(:name="key")
</template>

<style scoped lang="scss">
.brand-card {
  --border-color: #{$color-board};
  --border-width: unit(4);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: unit(20);
  flex-grow: 0;
  color: $color-primary-text-light;
  background-color: $color-primary-bg-dark;
  padding: unit(20);
  border: {
    width: var(--border-width);
    style: solid;
    color: var(--border-color);
    radius: unit(16);
  }

  &__image{
    margin: 0;
  }

  &__info{
    display: flex;
    flex-direction: column;
    gap: unit(10);
  }

  &__social{
    display: flex;
    justify-content: center;
    gap: unit(10);
    list-style: none;
    padding: 0;
    margin: 0;
    li{
      a{
        color: $color-primary-text-light;
        text-decoration: none;
      }
    }
  }
}
</style>
