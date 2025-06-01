<script lang="ts" setup>
const props = defineProps<{
  modelValue: string;
  alt: string;
  caption?: string;
  wrapped?: boolean;
  alignment?: 'left' | 'right' | 'center';
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'update:wrapped', value: string): void;
  (e: 'update:alignment', value: string): void;
  (e: 'update:caption', value: string): void;
  (e: 'delete'): void;
}>();

const modelCaption = computed({
  get: () => props.caption || '',
  set: (value) => {
    emit('update:caption', value);
  },
});

const modelWrapped = computed({
  get: () => props.wrapped ? ['wrapped'] : [],
  set: (value) => {
    emit('update:wrapped', value[0]);
  },
});
const modelAlignment = computed({
  get: () => props.alignment ? [props.alignment] : [],
  set: (value) => {
    emit('update:alignment', value[0]);
  },
});
</script>

<template lang="pug">
.blog-asset-image
  fieldset
    legend Image
    label.preview
      img(:src="modelValue" :alt="alt")
      input(type="file" accept="image/*" @change="$emit('set-preview', $event.target.files[0])")
  fieldset
    FormInput(type="textarea" label="Caption" v-model="modelCaption" placeholder="Enter the image caption")
  fieldset(v-if="caption")
    legend Wrapped
    FormBox(
      label="Wrapped"
      type="checkbox"
      value="wrapped"
      name="wrapped"
      :checked="wrapped"
      v-model="modelWrapped"
    )
  fieldset(v-if="wrapped")
    legend Alignment
    FormBox(
      label="Left"
      type="radio"
      name="alignment"
      value="left"
      v-model="modelAlignment"
      :checked="alignment === 'left'"
    )
    FormBox(
      label="Right"
      type="radio"
      name="alignment"
      value="right"
      v-model="modelAlignment"
      :checked="alignment === 'right'"
    )
</template>

<style lang="scss" scoped>
.blog-asset-image {
  display: flex;
  flex-direction: column;
  gap: unit(20);

  fieldset{
    display: flex;  
    gap: unit(20);
    width: 100%;
    margin: 0;

    .sk-input{
      width: 100%;
    }

    input[type="file"]{
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    label{
      display: flex;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      img{
        width: 100%;
      } 

      &.preview{
        position: relative;
        width: 100%;
        img{
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
        }
      }
    }
  }
}
</style>