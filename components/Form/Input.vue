<script setup lang="ts">
defineProps<{
  label: string
  type: string
  modelValue: string | number,
  placeholder?: string,
  info?: string,
  error?: string,
}>()
</script>

<template lang="pug">
label.sk-input
  component.sk-input__input(:is="type == 'textarea' ? 'textarea' : 'input'" :class="{'textarea': type == 'textarea'}" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)")
  span.sk-input__label
    | {{ label }}
  span.sk-input__message(v-if="error || info")
    | {{ error || info }}
</template>

<style scoped lang="scss">
.sk-input{
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: unit(10);
  &__input{
    height: unit(40);
    padding-left: unit(16);
    padding-right: unit(16);
    padding-top: unit(4);
    border: unit(2) solid $color-board;
    border-radius: unit(100);
    font-size: unit(16);

    &.textarea{
      min-height: unit(120);
      padding: unit(16);
      border-radius: unit(16);
    }
  }
  &__label{
    display: block;
    color: #FFF;
    position: absolute;
    top: 0;
    left: unit(16);
    transform: translateY(-50%);
    background-color: $color-primary-bg-dark;
    padding: unit(2) unit(4);
    font-weight: bold;
    font-size: unit(12);
    border-radius: unit(36);
  }
}
</style>
