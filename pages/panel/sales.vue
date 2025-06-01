<script setup lang="ts">
import type Modal from '~/components/Modal.vue';
import type { Sale } from '~/server/utils/drizzle';

const saleFormModal = ref<InstanceType<typeof Modal> | null>(null)
const saleDetail = ref<InstanceType<typeof Modal> | null>(null)

const { getSales } = useSale()

const { data: sales } = await getSales();

const currentSale = ref<Sale | null>(null)

const { getProductCollection } = useProduct()

const saleProducts = ref<Product[]>([])

const handleSaleDetail = async (sale: Sale) => {
  currentSale.value = sale
  const skus = (sale.products as Array<{ sku: string }>).map(p => p.sku) 
  saleProducts.value = await getProductCollection(skus)
  saleDetail.value!.toggleDialog()
}

const handleNewSale = (sale: Sale) => {
  sales.value!.push(sale)
  currentSale.value = sale
  saleProducts.value = []
  saleFormModal.value!.toggleDialog()
}
</script>

<template lang="pug">
section
  Container
    h1 Sales
    button(@click="saleFormModal.toggleDialog()") New Sale
    SaleList(@detail="handleSaleDetail" :sales="sales")
  Modal(ref="saleFormModal")
    template(#header)
      h2 New Sale
    template(#body)
      SaleForm(@pushSale="handleNewSale")
  
  Modal(ref="saleDetail")
    template(#header)
      h2 Sale Detail
    template(#body)
      p {{ currentSale ? currentSale : 'No sale selected' }}
      ProductList(v-if="currentSale" :products="saleProducts")
</template>

<style scoped></style>
