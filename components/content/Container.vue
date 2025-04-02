<script setup lang="ts">
import { breakpointXs, breakpointSm, breakpointMd, breakpointLg, breakpointXl } from '@/assets/ts/tokens'

const props = defineProps<{
  withPadding?: boolean,
  isFull?: boolean,
  isFullSm?: boolean,
  isFullMd?: boolean,
  isFullLg?: boolean,
  isFullXl?: boolean,
}>()

const full = ref(false)

onMounted(() => {
  if(window.matchMedia(breakpointXs).matches && props.isFull) full.value = true
  if(window.matchMedia(breakpointSm).matches && props.isFullSm) full.value = true
  if(window.matchMedia(breakpointMd).matches && props.isFullMd) full.value = true
  if(window.matchMedia(breakpointLg).matches && props.isFullLg) full.value = true
  if(window.matchMedia(breakpointXl).matches && props.isFullXl) full.value = true
})

</script>

<template lang="pug">
  section.container(:class="{ 'container--with-padding': withPadding, 'container--contained': !full }")
    div.container__content
      slot
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &--with-padding {
    padding-top: unit(20);
    padding-bottom: unit(20);

    @media #{$breakpoint-sm} {
      padding-top: unit(40);
      padding-bottom: unit(40);
    }
  }

  &--contained {
    .container__content{
      padding-left: unit(20);
      padding-right: unit(20);

      @media #{$breakpoint-sm} {
        padding: 0;
        max-width: $limit-sm;
      }
      @media #{$breakpoint-md} {
        max-width: $limit-md;
      }
      @media #{$breakpoint-lg} {
        max-width: $limit-lg;
      }
      @media #{$breakpoint-xl} {
        max-width: $limit-xl;
      }
    }
  }

  &__content {
    margin: auto;
    width: 100%;
  }
}
</style>
