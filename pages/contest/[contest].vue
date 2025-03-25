<script setup lang="ts">
const route = useRoute()
const { getContest } = useContest()
const contest = await getContest(route.params.id as string)
console.log(contest)
</script>

<template lang="pug">
.contest
    h1 Contest 
</template>

<style scoped lang="scss">

</style>