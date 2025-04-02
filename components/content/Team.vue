<script setup lang="ts">
const { getSkaters } = useSkater();
const { data: _skaters } = await getSkaters();

const teamSlider = ref(null);

const swiper = useSwiper(teamSlider, {
  slidesPerView: 1.2,
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
  },
});

onMounted(() => {
  swiper.instance;
});
</script>

<template lang="pug">
section.team
  slot
  Grid
    GridCol(size="1" sizeSm="1/2" :grow="true")
      iframe(width="100%" height="100%" src="https://www.youtube.com/embed/RxMKNwpV6h0?si=QcaFHMVxT8vY71gT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen)
    GridCol(size="1" sizeSm="1/2" :grow="true" style="position: relative;")
      swiper-container.team__list(ref="teamSlider" :init="false")
        swiper-slide.team__list--item(v-for="(skater, i) in _skaters" :key="skater.title")
          SkaterCard(v-bind="skater.meta.skater" :test="i === 0")
</template>

<style scoped lang="scss">
.team {
  &__list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: unit(20);
    list-style: none;
    padding: 0;
    padding-top: unit(20);
    padding-bottom: unit(20);
  }

  &__list--item {
    display: flex;
  }

  .grid-col {
    border: {
      style: solid;
      color: $color-board;
      width: unit(4);
      radius: unit(16);
    }
    overflow: hidden;

    &:nth-child(2) {
      background-color: $color-board;
    }
  }
}
</style>
