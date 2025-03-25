<script setup lang="ts"></script>

<template lang="pug">
swiper-slide.slide
  slot
</template>

<style scoped lang="scss">
.slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
