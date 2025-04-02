<script setup lang="ts">
defineProps<{
  name: string
  banner: string
  date: string
  cost: number
  id: number
}>()

const { toCurrency } = useCurrency()
</script>

<template lang="pug">
article.contest-card
  figure.contest-card__image
    img.picture(:src="`/blob/${banner}`" :alt="name")
  h3.contest-card__title {{ name }}
  div.contest-card__info
    p Date: {{ date }}
    p Cost: {{ toCurrency(cost) }}
  NuxtLink(:to="`/contest/${id}`") More info
</template>

<style scoped lang="scss">
.contest-card{
  --border-color: #{$color-board};
  --border-width: unit(4);
  width: 100%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;
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
    img{
      width: 100%;
    }
  }

  &__info{
    display: flex;
    justify-content: space-between;
    p{
      margin: 0;
    }
  }
}
</style>
