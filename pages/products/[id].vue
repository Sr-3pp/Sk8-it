<script setup lang="ts">
const { params } = useRoute()
const { id } = params

const { getProduct } = useProduct()
const product = await getProduct(Number(id))

const thumbs = computed(() => {
  return JSON.parse(product.thumbs)
})

const { toCurrency } = useCurrency()
</script>

<template lang="pug">
section.product
  h1.product__title {{ product.name }}
  figure.product__picture
    img(:src="thumbs[0]" :alt="product.name")
  p.product__description {{ product.description }}
  h2.product__price {{ toCurrency(product.price) }}
  NuxtLink(to="/products") Ver todos
</template>

<style scoped lang="scss">
.product {
  &__title {
    font-size: unit(24);
    margin-bottom: unit(16);
  }

  &__picture {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-top: 0;
    margin-bottom: 0;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    width: 50%;
    aspect-ratio: 1 / 1;
    border: {
      width: var(--border-width);
      style: solid;
      color: var(--border-color);
      radius: unit(16);
    };
  }

  &__description {
    margin-bottom: unit(16);
  }

  &__price {
    font-size: unit(20);
    margin-bottom: unit(16);
  }
}
</style>
