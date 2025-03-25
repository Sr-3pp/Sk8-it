<script setup lang="ts">
const props = defineProps<{
  label: string
  type: string
  value: string
  modelValue: string[],
  placeholder?: string,
  info?: string,
  error?: string,
}>()

const emit = defineEmits(['update:modelValue'])

const updateValue = (e: InputEvent) => {
  const newValue = [...props.modelValue]
  newValue.push(e.target.value)
  emit('update:modelValue', newValue)
}
</script>

<template lang="pug">
label.sk-input-box
  input.sk-input-box__input(:type="type" :value="value" @change="updateValue")
  span.sk-input-box__checkmark
  span.sk-input-box__label
    | {{ label }}
  span.sk-input-box__message(v-if="error || info")
    | {{ error || info }}
</template>

<style scoped lang="scss">
.sk-input-box{
  display: flex;
  align-items: center;
  gap: unit(8);
  position: relative;
  padding-left: unit(20);
  &__input{
    opacity: 0;
    position: absolute;
    height: 0;
    width: 0;

    &:checked + .sk-input-box__checkmark::after{
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
  &__checkmark{
    height: unit(16);
    width: unit(16);
    background-color: $color-primary-bg-dark;
    border: unit(2) solid $color-board;
    border-radius: unit(4);
    position: relative;

    &::after{
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      transform-origin: center;
      opacity: 0;
      background-color: $color-board;
      width: 80%;
      height: 80%;
      border-radius: unit(99);
      transition: transform .35s ease-in-out, opacity .35s ease-in-out;
    }
  }
  &__label{
    display: block;
    font-size: unit(14);
    color: #fff;
  }
}
</style>
