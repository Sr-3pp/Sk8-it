<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description,
})
</script>

<template lang="pug">
  ContentRenderer(v-if="home" :value="home")
</template>

<style  lang="scss">
.top-bar ~ [data-content-id] .slider{
  margin-top: unit(-40);
}

.slider{
  .banner{
    width: 100%;
    height: unit(500);
  }
}
</style>
