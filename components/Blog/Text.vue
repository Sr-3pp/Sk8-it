<script lang="ts" setup>
const props = defineProps<{
  text: string;
  alignment?: 'left' | 'right' | 'center';
  size?: 'text' | 'subtitle' | 'title';
}>();

const classObj = computed(() => {
  return {
    [`alignment-${props.alignment}`]: props.alignment,
  };
});

</script>

<template lang="pug">
.blog-text
  MdPreview.blog-text__content(:content="text" :class="classObj")
</template>

<style lang="scss" scoped>
.blog-text {
  display: inline-block;
  margin: 0 auto;

  &__content {
    display: flex;
    flex-direction: column;
    gap: unit(20);
    font-size: unit(16);
    white-space: pre-line;

    &.alignment-left {
      text-align: left;
    }
  
    &.alignment-right {
      text-align: right;
    }
  
    &.alignment-center {
      text-align: center;
    }
  }

}
</style>