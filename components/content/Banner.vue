<script setup lang="ts">
defineProps<{
  picture: string
}>()
</script>

<template lang="pug">
  figure.banner
    picture.banner__img
      img(:src="picture" alt="Banner")
    figcaption.banner__caption
      slot
</template>

<style scoped lang="scss">
.banner {
  display: flex;
  width: 100%;
  position: relative;
  margin: 0;
  &__img {
    width: 100%;
    img{
      width: 100%;
      height: 100%;
      overflow: hidden;
      object-fit: cover;
    }
  }
  &__caption {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 2rem;
    text-align: center;
  }
}
</style>
