<script lang="ts" setup>
const { data } = await $fetch('/api/trick-menu')

console.log(data)

</script>

<template lang="pug">
.trick-menu
  h1 Trick Menu
  ul
    li(v-for="item in data" :key="item.id")
      a(:href="`/trick/${item.id}`") {{ item.name }}
      p {{ item.description }}
</template>

<style>

</style>