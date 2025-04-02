<script setup lang="ts">
const { getHighlights } = useProduct()

const { data: products } = await getHighlights()
</script>

<template lang="pug">
section.products
  slot
  Container(:withPadding="true" :isFull="true" :isFullSm="false") 
    Suspense
      ul.products__list(v-if="products.length")
        li.products__list--item(v-for="product in products" :key="product._id")
          ProductCard(v-bind="product")
      h4(v-else) No products found
    NuxtLink(to="/products") Ver todos
</template>

<style scoped lang="scss">
.products{
  &__list{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    list-style: none;
    padding: 0;
  }

  &__list--item{
    width: calc(33.333% - 1rem);
    display: flex;

    >*{
      width: 100%;
    }
  }
}
</style>
