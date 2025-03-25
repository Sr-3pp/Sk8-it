<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template lang="pug">
svg.icon
  use(:href="`/icons/${name}.svg#s`")
</template>

<style scoped lang="scss">
.icon{
  width: unit(24);
  height: unit(24);
  fill: currentColor;
}
</style>
