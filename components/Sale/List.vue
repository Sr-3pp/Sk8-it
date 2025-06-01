<script setup lang="ts">
defineProps<{
  sales: {
    id: number,
    created_at: string,
    sellerId: string,
    products: { sku: string, name: string, price: number }[],
    total: number
  }[]
}>()
</script>

<template lang="pug">
ul.sales-list
  li(v-for="sale in sales" :key="sale.id")
    p {{ sale.created_at }}
    p {{ sale.sellerId }}
    p {{ sale.products.length }} products
    p {{ sale.total }}
    button(@click="$emit('detail', sale)") detail
</template>

<style scoped></style>
