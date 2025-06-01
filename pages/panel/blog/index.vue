<script lang="ts" setup>
const { data:blog } = await useAsyncData('blog', () => queryCollection('content').where('path', 'LIKE', '%/blog/entries%').all())
</script>

<template lang="pug">
.blog
  Container
    h1 Blog
    NuxtLink(to="/panel/blog/new") Add Blog Entry
    ul
      li(v-for="entry in blog" :key="entry.id")
        p {{ entry.title }}
        p {{ entry.description }}
</template>

<style lang="scss">
.blog{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  color: #333;
}
</style>