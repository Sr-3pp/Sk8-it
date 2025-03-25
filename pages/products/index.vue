<script setup lang="ts">
const { getProducts } = useProduct()

const { data: products } = await getProducts()
</script>

<template lang="pug">
Container.store
  h2 Store
  ul.store__list
    li.store__list--item(v-for="product in products" :key="product._id")
      ProductCard(v-bind="product")
</template>

<style scoped lang="scss">
.store{
  &__list{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    list-style: none;
    padding: 0;
  }

  &__list--item{
    flex-grow: 1;
    width: calc(33.333% - 1rem);
    display: flex;

    >*{
      width: 100%;
    }
  }
}
</style>
