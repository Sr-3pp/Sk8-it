<script setup lang="ts">
const props = defineProps<{
  config?: {}
}>();
const slider = ref()

const config = computed(() => {
  return {
    ...{
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
    },
    ...props.config || {},
  }
})

const swiper = useSwiper(slider, config.value)

</script>

<template lang="pug">
swiper-container.slider(ref="slider" :init="false")
  slot
</template>

<style scoped></style>
