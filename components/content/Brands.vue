<script setup lang="ts">
defineProps<{
  collabs: any[];
}>();

const { getContests } = useContest();
const { data: contests } = await getContests();
</script>

<template lang="pug">
Grid.brands
  GridCol(size="1" sizeSm="2/3")
    h2 Collabs
    ul.brands__list
      li.brands__list--item(v-for="brand in collabs" :key="brand.name")
        BrandCard(v-bind="brand")
  GridCol(size="1" sizeSm="1/3")
    h2 Contests
    ul
      li(v-for="contest in contests" :key="contest.id")
        ContestCard(v-bind="contest")
</template>

<style scoped lang="scss"></style>
