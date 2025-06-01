<script lang="ts" setup>
defineProps<{
  item: {
    component: string;
    props: {
      [key: string]: any;
    };
  }
}>();

const emit = defineEmits<{
  (e: 'update', key: string, value: string | File): void;
  (e: 'update:carrousel', key: string, idx: number, value: string): void;
  (e: 'delete:carrousel', idx: number): void;
}>();

const galleryHandler = (file: File) => {
  const url = URL.createObjectURL(file);
  emit('update', 'src', url);
  emit('update', 'file', file);
};

const carrouselHandler = (key: string, $e: any) => {
  const value = $e[key];

  if (key === 'src') {
    const url = URL.createObjectURL($e.file);
    emit('update:carrousel', key, $e.idx, url);
    emit('update:carrousel', 'file', $e.idx, $e.file);
  }else if (key === 'delete'){
    console.log('delete', $e);
    emit('delete:carrousel', $e)
  }else{
    emit('update:carrousel', key, $e.idx, value);
  }
  
};

const updateHandler = (key: string, value: string) => {
  emit('update', key, value);
}
</script>

<template lang="pug">
.blog-asset
  BlogAssetText(
    v-if="item.component === 'BlogText'"
    v-bind="item.props"
    @update:text="updateHandler('text', $event)"
    @update:alignment="updateHandler('alignment', $event)"
    @update:size="updateHandler('size', $event)"
  )
  
  BlogAssetImg(
    v-if="item.component === 'BlogImg'"
    v-bind="item.props"
    v-model="item.props.src"
    @update:alt="updateHandler('alt', $event)"
    @update:caption="updateHandler('caption', $event)"
    @update:alignment="updateHandler('alignment', $event)"
    @update:wrapped="updateHandler('wrapped', $event)"
    @set-preview="galleryHandler"
  )
  
  BlogAssetCarrousel(
    v-if="item.component === 'BlogCarrousel'"
    v-bind="item.props"
    v-model="item.props.alt"
    @update:preview="carrouselHandler('src', $event)"
    @update:caption="carrouselHandler('caption', $event)"
    @delete="carrouselHandler('delete', $event)"
  )
</template>

<style lang="scss" scoped>

</style>