<script lang="ts" setup>
defineProps<{
  tags: string[];
}>();
const tag = ref<string>('');

const emit = defineEmits<{
  (e: 'update:tags', tag: string): void;
  (e: 'remove:tag', index: number): void;
}>();

const addTag = () => {
  const trimmed = tag.value.trim();
  if (trimmed !== '') {
    emit('update:tags', trimmed);
    tag.value = '';
  }
};

const removeTag = (index: number) => {
  emit('remove:tag', index);
};
</script>

<template lang="pug">
.blog-tag-input
  FormInput(type="text" label="tag" v-model="tag" @keyup.enter="addTag")
  ul
    li(v-for="(tag, index) in tags" :key="index")
      span {{ tag }}
      button(@click="removeTag(index)") X
</template>

<style lang="scss" scoped>
.blog-tag-input {
  width: 100%;
  position: relative;
  display: flex;
  gap: unit(10);

  ul {
    display: flex;
    gap: unit(5);
    width: 100%;
    flex-shrink: 0;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #d0d0d0;
      border-radius: unit(5);
      padding: unit(5);


      button {
        padding: 0;
        border: none;
        background-color: transparent;
        cursor: pointer;
        color: red;
      }
      span{
        font-size: unit(14);
        color: #333;
      }
    }
  }
}
</style>