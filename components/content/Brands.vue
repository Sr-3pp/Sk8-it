<script setup lang="ts">
defineProps<{
  collabs: any[];
}>();

const { getContests } = useContest();
const { data: contests } = await getContests();

const collabSwiper = ref();
const contestSwiper = ref();
const swiperCollab = useSwiper(collabSwiper, {
  slidesPerView: 1.2,
  spaceBetween: 16,
  slidesOffsetBefore: 20,
  slidesOffsetAfter: 20,
  breakpoints: {
    640: {
      slidesPerView: 2,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
    },
  },
});

const swiperContest = useSwiper(contestSwiper, {
  slidesPerView: 1.2,
  spaceBetween: 16,
  centeredSlides: true,
  slidesOffsetBefore: 20,
  slidesOffsetAfter: 20,
  breakpoints: {
    640: {
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
    },
  },
});


onMounted(() => {
  swiperCollab.instance;
  swiperContest.instance;
});

</script>

<template lang="pug">
Container(:isFull="true" :isFullSm="false" :withPadding="true")
  Grid.brands
    GridCol(size="1" sizeSm="2/3" :grow="true")
      h2 Collabs
      swiper-container.brands__list(ref="collabSwiper" :init="false")
        swiper-slide.brands__list--item(v-for="brand in collabs" :key="brand.name")
          BrandCard(v-bind="brand")
    GridCol(size="1" sizeSm="1/3" :grow="true")
      h2 Contests
      swiper-container.brands__list(ref="contestSwiper" :init="false")
        swiper-slide.brands__list--item(v-for="contest in contests" :key="contest.id")
          ContestCard(v-bind="contest")
</template>

<style scoped lang="scss">
.brands{
  h2{
    padding-left: unit(20);
    padding-right: unit(20);
    
    @media #{$breakpoint-sm} {
      padding-left: unit(0);
      padding-right: unit(0);
    }
  
  }

  &__list{
    height: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: unit(16);
    flex-wrap: wrap;
    justify-content: center;
    li{
      margin-bottom: unit(16);
    }
  }
}
</style>
