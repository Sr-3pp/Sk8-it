<script lang="ts" setup>
const props = defineProps<{
  text: string;
  alignment?: 'left' | 'right' | 'center';
  size?: 'text' | 'subtitle' | 'title';
}>();

const emit = defineEmits<{
  (e: 'update:text', text: string): void;
  (e: 'update:alignment', alignment: string): void;
  (e: 'delete'): void;
}>();

const value = computed({
  get: () => props.text,
  set: (value) => {
    emit('update:text', value);
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
form.blog-asset-text(@submit.prevent)
  fieldset
    FormInput(type="textarea" label="content" v-model="value" placeholder="Enter the text content")
  fieldset
    legend Alignment
    label
      FormBox(
        label="Left"
        type="radio"
        name="alignment"
        value="left"
        :checked="alignment === 'left'"
        v-model="modelAlignment"
      )
    label
      FormBox(
        label="Right"
        type="radio"
        name="alignment"
        value="right"
        :checked="alignment === 'right'"
        v-model="modelAlignment"
      )
    label
      FormBox(
        label="Center"
        type="radio"
        name="alignment"
        value="center"
        :checked="alignment === 'center'"
        v-model="modelAlignment"
      )
</template>

<style lang="scss" scoped>
.blog-asset-text {
  display: flex;
  flex-direction: column;
  gap: unit(20);

  fieldset{
    display: flex;  
    gap: unit(20);
    margin: 0;

    .sk-input{
      width: 100%;
    }
  }
}
</style>