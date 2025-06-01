<script lang="ts" setup>
defineProps<{
  items: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}>();

const sliderConfig = {
  effect: 'default',
  loop: false,
  autoplay: false,
  slidesPerView: 1.2,
  centeredSlides: true,
  spaceBetween: 20,
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
};

</script>

<template lang="pug">
Slider.blog-carrousel(:config="sliderConfig")
  Slide.blog-carrousel__slide(v-for="(item, index) in items", :key="index")
    NuxtImg.blog-carrousel__slide__img(:src="item.src" :alt="item.alt")
    figcaption.blog-carrousel__slide__caption(v-if="item.caption")
      MdPreview(:content="item.caption")
</template>

<style lang="scss" scoped>
.blog-carrousel {

  &__slide {
    display: flex;
    flex-direction: column;
    gap: unit(20);
    width: 100%;
    transition: transform 0.5s ease-in-out;
    position: relative;

    &__img {
      width: 100%;
      height: auto;
      border-radius: unit(20);
    }

    &__caption {
      position: absolute;
      bottom: unit(10);
      left: unit(10);
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      padding: unit(10);
      border-radius: unit(10);
    }
  }
}
</style>