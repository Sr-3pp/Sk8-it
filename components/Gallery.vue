<script setup lang="ts">
import type Modal from './Modal.vue'
import type { Category } from '~~/server/utils/drizzle'

const emit = defineEmits(['set-picture'])

const gallery = ref<InstanceType<typeof Modal> | null>(null)

const toggleGallery = () => {
  gallery.value?.toggleDialog()
}

defineExpose({
  toggleGallery,
})

const { data } = await useAsyncData(async () => {
  const { data: galleryData } = await $fetch<{ data: { id: number, pathname: string }[] }>('/api/blob/img')
  const { data: categoriesData } = await $fetch<{ data: Category[] }>('/api/categories')
  return {
    _gallery: galleryData,
    categories: categoriesData,
  }
})

console.log(data.value)

const _gallery = ref(data.value?._gallery)
const categories = ref(data.value?.categories)

const picPath = ref(categories.value?.[0]!.name.toLocaleLowerCase())

const setPicture = (img: { id: number, pathname: string }) => {
  emit('set-picture', img)
  gallery.value?.toggleDialog()
}

const deleteThumb = async (img: { id: number, pathname: string }) => {
  const { message } = await $fetch<{ message: string }>(`/api/blob/${img.pathname}`, {
    method: 'DELETE',
  })

  if (message) {
    _gallery.value = _gallery.value?.filter((i: { id: number }) => i.id !== img.id)
  }
}

const addImage = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files![0]
  const formData = new FormData()
  formData.append('file', file as Blob)
  formData.append('type', 'image')
  const img = await $fetch<{ id: number, pathname: string }>(`/api/blob/img${picPath.value ? `/${picPath.value}` : ''}`, {
    method: 'PUT',
    body: formData,
  })
  _gallery.value?.push(img)
}
</script>

<template>
  <Modal ref="gallery" class="img-gallery">
    <template #body>
      <h1>Gallery</h1>
      <label>
        <span>
          Add Image
        </span>
        <input type="file" accept="image/*" @change="addImage">
      </label>
      <label>
        <span>
          Pathname
        </span>
        <select v-model="picPath">
          <option v-for="cat in categories" :key="cat.id" :value="cat.name.toLocaleLowerCase()">
            {{ cat.name }}
          </option>
        </select>
      </label>
      <ul class="img-gallery__list">
        <li v-for="img in _gallery" :key="img.id" class="img-gallery__item">
          <button class="img-gallery__thumb" @click="setPicture(img)">
            <img :src="`/blob/${img.pathname}`" alt="" />
            <span>{{ img.pathname }}</span>
          </button>
          <button class="img-gallery__delete" @click="deleteThumb(img)">
            Delete
          </button>
        </li>
      </ul>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
.img-gallery{
  &__list{
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  &__item{
    display: flex;
    width: 25%;
    position: relative;
  }

  &__thumb{
    position: relative;
    padding: 0;

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    span{
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      padding: 0.5rem;
    }
  }

  &__delete{
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
