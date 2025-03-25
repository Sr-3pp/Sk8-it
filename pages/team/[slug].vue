<script setup lang="ts">
const { params } = useRoute()
const { slug } = params

const { data: skater } = await useAsyncData(() => queryCollection('content').path(`/team/${slug}`).first())

useSeoMeta({
  title: skater.value?.title,
  description: skater.value?.description,
})
</script>

<template lang="pug">
Banner(picture="https://picsum.photos/1100/200" title="Team" subtitle="Meet the team")
Container(:withPadding="true")
  SkaterHeader(v-if="skater" v-bind="skater.meta.skater")
ContentRenderer(v-if="skater" :value="skater")
iframe.instagram-frame(:src="`https://www.instagram.com/${skater.meta.skater.social.instagram}/embed`")
</template>

<style lang="scss">
.top-bar ~ .banner{
  margin-top: unit(-40);
}

.skater {
  &__picture {
    height: unit(500);
    overflow: hidden;
    position: relative;
    border: {
      width: var(--border-width);
      style: solid;
      color: var(--border-color);
      radius: unit(16);
    }
    
    img{
      view-transition-name: skater-picture;
    }
  }
}

.instagram-frame {
  border: none;
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
}
</style>
