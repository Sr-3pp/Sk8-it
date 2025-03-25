<script setup lang="ts">
defineProps<{
  label: string
  value: string
  modelValue: string,
  options: string[]
  placeholder?: string,
  info?: string,
  error?: string,
}>()
</script>

<template lang="pug">
label.sk-select
  select.sk-select__select(:value="modelValue" @input="$emit('update:modelValue', $event.target.value)")
    option(value="" disabled selected) Select an option
      option(v-for="option in options" :value="option") {{ option }}
  span.sk-select__label
    | {{ label }}
  span.sk-select__message(v-if="error || info")
    | {{ error || info }}
</template>

<style scoped></style>
