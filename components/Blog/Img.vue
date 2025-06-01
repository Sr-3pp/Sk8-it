<script lang="ts" setup>
defineProps<{
  src: string;
  alt: string;
  caption?: string;
  wrapped?: boolean;
  alignment?: 'left' | 'right' | 'center';
}>();
</script>

<template lang="pug">
figure.blog-img(:class="{wrapped: caption && wrapped, [alignment]: alignment}")
  NuxtImg(:src="src" :alt="alt")
  figcaption(v-if="caption")
    MdPreview.blog-img__content(:content="caption")
</template>

<style lang="scss" scoped>
.blog-img {
  display: flex;
  flex-direction: column;
  gap: unit(20);
  margin: 0 auto;
  width: 100%;

  img {
    border-radius: unit(20);
  }
  
  &__content{
    white-space: pre-line;
  }

  &.wrapped {
    display: inline-block;
    margin: 0 auto;

    img {
      border-radius: 100%;
      float: left;
      padding: unit(10);
      shape-outside: circle();
      aspect-ratio: 1;
      object-fit: cover;
      width: 50%;
    }

    &.right{
      img{
        float: right;
      }
    }
    &.left{
      img{
        float: left;
      }
      figcaption{
        text-align: left;
      }
    }
  }
}
</style>