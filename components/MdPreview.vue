<script setup lang="ts">
const props = defineProps({
  content: String
})

const { parseMarkdown } = useMarkdown()
const html = computed(() => {
  return parseMarkdown(props.content as string)
})
</script>
<template>
  <div v-html="html" />
</template>

<style lang="scss" scoped>
</style>
