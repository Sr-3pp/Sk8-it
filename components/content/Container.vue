<script setup lang="ts">
defineProps<{
  withPadding: boolean
}>()
</script>

<template lang="pug">
  section.container(:class="{ 'container--with-padding': withPadding }")
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

  &__content {
    margin: auto;
    width: 100%;
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
</style>
