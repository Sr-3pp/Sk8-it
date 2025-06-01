<script lang="ts" setup>
defineProps<{
  items: {src: string, alt: string}[];
}>();

const emit = defineEmits<{
  (e: 'update:preview', {}): void;
  (e: 'update:caption', {}): void;
}>();

const setSlide = (idx: number, file: File) => {
  const url = URL.createObjectURL(file);
  emit('update:preview', { idx, src: url, file });
};

const setCaption = (idx: number, caption: string) => {
  emit('update:caption', { idx, caption });
};
</script>

<template lang="pug">
.blog-asset-carrousel
  ul.blog-asset-carrousel__list
    li.blog-asset-carrousel__list-item(v-for="(asset, index) in items" :key="index")
      label.preview
        img(:src="asset.src" :alt="asset.alt")
        input(type="file" @change="setSlide(index, $event.target.files[0])" placeholder="Alt text")
      FormInput(
        type="textarea"
        label="Caption"
        v-model="asset.caption"
        @input="setCaption(index, $event.target.value)"
      )
      button(type="button" @click="$emit('delete', index)")
        Icon(name="trash")
</template>

<style lang="scss" scoped>
.blog-asset-carrousel {
  display: flex;
  flex-direction: column;
  gap: unit(20);

  &__list {
    display: flex;
    overflow: auto;
    gap: unit(20);
    list-style: none;
    padding: 0;
    margin: 0;
    scroll-snap-type: x mandatory;

    &-item {
      display: flex;
      flex-direction: column;
      gap: unit(10);
      width: calc(100% - unit(80));
      scroll-snap-align: center;
      scroll-snap-stop: always;

      img{
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
      }

      .preview{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: #d0d0d0;
        border-radius: unit(20);

        input{
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }
      }
    }
  }
}

</style>