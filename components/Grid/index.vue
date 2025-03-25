<script setup lang="ts"></script>

<template lang="pug">
div.grid
  slot
</template>

<style scoped lang="scss">
.grid {
  --gap: #{unit(20)};
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: var(--gap);
}
</style>
