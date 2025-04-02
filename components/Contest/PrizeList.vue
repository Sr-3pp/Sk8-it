<script setup lang="ts">
defineProps<{
  prizes: string[]
}>()
</script>

<template lang="pug">
.prize-list
  h2 Prizes
  ul.prize-list__list
    li.prize-list__list__item(v-for="(prize, i) in prizes" :key="prize")
      span {{ i + 1 }}°
      h3 {{ prize }}
</template>

<style scoped lang="scss">
.prize-list{
  &__list{
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    gap: unit(20);
    &__item{
      display: flex;
      gap: unit(10);
      flex-direction: column;
      align-items: center;
      text-transform: capitalize;
      span{
        background-color: $color-board;
        color: $color-primary-text-light;
        padding: unit(10);
        border-radius: unit(99);
        font-size: unit(30);
        font-weight: bold;
        margin: 0;
        width: unit(80);
        display: flex;
        justify-content: center;
        align-items: center;
        aspect-ratio: 1;
        flex-shrink: 0;
      }
  
      h3{
        margin: 0;
      }
    }
  }
}
</style>
