<script setup lang="ts">
const { data } = await useAsyncData(async () => {
  const countries = await $fetch<
    {
      cca2: string
      name: { common: string }
    }[]
  >('https://restcountries.com/v3.1/all')
  return {
    countries,
  }
})

const countries = ref(data.value?.countries)

const model = defineModel<string>({
  default: 'MX',
})
</script>

<template>
  <label>
    Country
    <select v-model="model">
      <option
        v-for="country in countries"
        :key="country.cca2"
        :value="country.cca2"
      >
        {{ country.name.common }} | {{ country.cca2 }}
      </option>
    </select>
  </label>
</template>

<style scoped></style>
