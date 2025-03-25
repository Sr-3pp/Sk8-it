<script setup lang="ts">
const slider = ref()
const swiper = useSwiper(slider, {
  effect: 'creative',
  loop: true,
  autoplay: {
    delay: 5000,
  },
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      shadow: true,
      translate: [0, 0, -400],
    },
  },
})

</script>

<template lang="pug">
swiper-container.slider(ref="slider" :init="false")
  slot
</template>

<style scoped></style>
