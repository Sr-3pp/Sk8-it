<script setup lang="ts">
defineProps<{
  label: string
  modelValue: string | number | null,
  options: Array<{  value: string | number, label: string }>,
  placeholder?: string,
  info?: string,
  error?: string,
}>()
</script>

<template lang="pug">
label.sk-select
  select.sk-select__select(:value="modelValue" @input="$emit('update:modelValue', $event.target.value)")
    option(:value="null" disabled selected) Select an option
    option(v-for="option in options" :value="option.value") {{ option.label }}
  span.sk-select__label
    | {{ label }}
  span.sk-select__message(v-if="error || info")
    | {{ error || info }}
</template>

<style lang="scss" scoped>
.sk-select {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: unit(10);
  max-width: unit(250);
  
  &__select {
    height: unit(40);
    padding-left: unit(16);
    padding-right: unit(40);
    padding-top: unit(4);
    border: unit(2) solid $color-board;
    border-radius: unit(100);
    font-size: unit(16);
    background-color: $color-primary-bg-light;
    color: black;
    appearance: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='black' d='M8 12L3 7h10l-5 5z'/%3E%3C/svg%3E");
    background-position: right unit(12) center;
    background-repeat: no-repeat;
    background-size: unit(16) unit(16);
    
    &:focus {
      outline: none;
    }
  }
  
  &__label {
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
