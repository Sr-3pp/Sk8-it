<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content'

definePageMeta({
  middleware: 'admin',
})

const { getSkaters, deleteSkater } = useSkater()
const { data: skaters } = await getSkaters()

const pushSkater = (skater: ContentCollectionItem) => {
  skaters.value?.push(skater)
}

console.log('skaters', skaters)
</script>

<template>
  <section>
    <h1>Skaters</h1>
    <SkaterForm @user-added="pushSkater" />
    <ul>
      <li v-for="(skater, i) in skaters" :key="skater.id">
        {{ skater.title }}
        <button @click="deleteSkater(skater.id, i)">delete</button>
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
