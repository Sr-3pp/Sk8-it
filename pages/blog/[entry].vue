<script lang="ts" setup>
const { entry } = useRoute().params;
</script>

<template lang="pug">
.blog-entry
  h1 Blog Entry {{ entry }}
</template>


<style lang="scss" scoped>

</style>