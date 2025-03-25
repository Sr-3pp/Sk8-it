<script setup lang="ts">
const props = defineProps<{
  id: number,
  name: string,
  category: {
    name: string,
  },
  subcategory: {
    name: string,
  },
  price: number,
  thumbs: string,
}>()

const thumbs = computed(() => {
  return JSON.parse(props.thumbs)
})

const { toCurrency } = useCurrency()
</script>

<template lang="pug">
NuxtLink.product-card(:to="'/products/' + id")
  figure.product-card__picture(:class="{'is-board': category.name === 'Board'}")
    img(:src="thumbs[0]" :alt="name")
  h3 {{ name }}
  p {{ category.name }}
  p {{ subcategory.name }}
  h4.price {{ toCurrency(price) }}
</template>

<style scoped lang="scss">
.product-card {
  --border-color: #{$color-board};
  --border-width: unit(4);
  color: $color-primary-text-light;
  display: flex;
  flex-direction: column;
  border: {
    width: var(--border-width);
    style: solid;
    color: var(--border-color);
    radius: unit(16);
  };
  padding: unit(20);
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
      radius: unit(80);
    };

    img {
      width: 100%;
      object-fit: cover;
    }

    &.is-board{
      width: 40%;
      aspect-ratio: 8 / 24;
      transform: rotate(25deg);
    }
  }

  .price {
    font-size: unit(24);
    font-weight: bold;
    margin-top: auto;
    margin-bottom: 0;
  }
}
</style>
