<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content'
import type { Product } from '~/server/utils/drizzle'

const { createSale } = await useSale()

const newSale = ref<{
  products: Array<{ id: number, sku: string, name: string, price: number, cost: number, models: { boards: {id: number, qty: number}[], clothes: {id: number, qty: number}[] } }>,
  total: number,
  outletId: number | null,
  sellerId: string | null,
}>({
  products: [],
  total: 0,
  outletId: null,
  sellerId: null,
})

const seller = computed<ContentCollectionItem | null>(() => {
  if (!newSale.value.sellerId) return null
  const skater = skaters.value!.find(s => s.id == newSale.value.sellerId)
  return skater ? skater : null
})

const withShipping = ref<string[]>([])
const shipping = ref({
  name: '',
  address: {
    country: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    number: '',
    complement: ''
  },
  phone: '',
  email: '',
  cost: ''
})

const currentId = ref<number | null>(null)

const currentProduct = computed<(Product & {
  boards?: [];
  clothes?: [],
  model: { id: number, size: number, shape?: string, color?: string, qty: number, stock?: number },
  models: {
    boards: [],
    clothes: []
  }
}) | null>(() => {
  if (!currentId.value) return null
  const product = products.value!.find(p => p.id === Number(currentId.value))
  if (!product) return null

  // Get models array from boards or clothes
  const models = {
    boards: (product as any)?.boards || [],
    clothes: (product as any)?.clothes || [],
  }

  // Pick the first model from boards or clothes as default, or provide a fallback
  let model: { id: number, size: number, shape?: string, color?: string, qty: number, stock: number } | undefined
  if (models.boards.length > 0) {
    const m = models.boards[0]
    model = { id: m.id, size: m.size, shape: m.shape ?? '', qty: 1, stock: m.stock ?? 0 }
  } else if (models.clothes.length > 0) {
    const m = models.clothes[0]
    model = { id: m.id, size: m.size, color: m.color ?? '', qty: 1, stock: m.stock ?? 0 }
  } else {
    model = { id: 0, size: 0, qty: 1, stock: 0 }
  }

  console.log('Current Product:', product, 'Models:', models, 'Model:', model)

  return {
    ...product,
    models,
    model
  }
})

const productModels = computed<Array<{ id: number, size: number, shape: string } | { id: number, size: number, color: string }>>(() => {
  if (!currentProduct.value) return []
  return currentProduct.value.boards || currentProduct.value.clothes || []
})

const emit = defineEmits<{
  (e: 'push-sale', sale: any): void
}>()

const handleSale = async () => {
  const cat = currentProduct.value?.categoryId == 1 ? 'boards' : 'clothes' as 'boards' | 'clothes'

  const totalQty = newSale.value.products.reduce((total, product) => {
    const models = product.models[cat]
    const totalModels = models.reduce((sum, model) => sum + (model.qty * product.price), 0)
    return total + totalModels
  }, 0)

  const saleData = {
    ...newSale.value,
    products: newSale.value.products.map(product => ({
      sku: product.sku,
      price: product.price,
      cost: product.cost,
      models: product.models,
    })),
    total: totalQty
  }

  const { data: sale } = await createSale(saleData, withShipping.value.includes('shipping') ? shipping.value : null)

  emit('push-sale', sale)
}

const modelInProduct = () => {
  if (!currentProduct.value || !currentProduct.value.models) return false
  const modelId = currentProduct.value.model.id
  return newSale.value.products.some(product => 
    product.id === currentProduct.value!.id && 
    product.models.boards.some(model => model.id === modelId) ||
    product.models.clothes.some(model => model.id === modelId)
  )
}

const addProduct = () => {
  if (modelInProduct() || currentProduct.value!.model.qty > currentProduct.value!.model.stock!) return

  newSale.value.products.push({
    id: currentProduct.value!.id,
    sku: currentProduct.value!.sku,
    name: currentProduct.value!.name,
    price: currentProduct.value!.price,
    cost: currentProduct.value!.cost || 0,
    models: {
      boards: currentProduct.value!.model.id == 1 ? [currentProduct.value!.model] : [],
      clothes: currentProduct.value!.model.id == 2 ? [currentProduct.value!.model] : []
    }
  })
}

const getComision = (price: number, quantity: number) => {
  return price * 0.25 * quantity
}

const { getProducts } = await useProduct()
const { getSkaters } = await useSkater()
const { getOutlets } = await useOutlet()

const { data: products } = await getProducts();
const { data: skaters } = await getSkaters();
const { data: outlets } = await getOutlets();

const productOptions = computed<Array<{ value: number, label: string }>>(() => {
  return products.value
    ? products.value.map(product => ({
        value: product.id,
        label: product.name,
      }))
    : []
})

const modelOptions = computed<Array<{ value: number, label: string }>>(() => {
  if (!currentProduct.value) return []
  return productModels.value.map(model => ({
    value: model.id,
    label: 'shape' in model ? `${model.size} - ${model.shape}` : `${model.size} - ${model.color}`,
  }))
})

const outletOptions = computed<Array<{ value: number, label: string }>>(() => {
  const outletList = outlets.value?.data || []
  return outletList.map((outlet) => ({
    value: outlet.id,
    label: outlet.name,
  }))
})

const sellerOptions = computed<Array<{ value: string, label: string }>>(() => {
  const skaterList = skaters.value || []
  return skaterList.map(skater => ({
    value: String(skater.meta.sku),
    label: skater.title,
  }))
})
</script>

<template lang="pug">
form.sale-form(@submit.prevent="handleSale")
  FormSelect(
    v-model="currentId"
    label="Product"
    name="product"
    :options="productOptions"
  )
  template(v-if="currentProduct")
    FormSelect(
      v-model="currentProduct.model.id"
      label="Model"
      name="model"
      :options="modelOptions"
    )
    FormInput(
      v-model="currentProduct.model.qty"
      label="Quantity"
      type="number"
      name="quantity"
      :max="currentProduct.model.stock"
    )
  button(type="button" @click="addProduct") Add product
  fieldset.sale-form__products(v-if="newSale.products.length")
    legend Products
    div(v-for="(product, i) in newSale.products" :key="product.id")
      template(v-for="model of Object.keys(product.models)")
        template(v-for="elm in product.models[model]")
          p {{ elm }}
          FormInput(
            v-model="elm.qty"
            type="number"
            name="quantity"
            :label="'Quantity ' + product.name"
          )
          button(@click="newSale.products.splice(i, 1)") Remove
  FormBox(
    v-model="withShipping"
    value="shipping"
    type="checkbox"
    label="Add shipping"
    name="shipping"
  )
  fieldset.sale-form__shipping(v-if="withShipping.includes('shipping')")
    legend Shipping
    FormInput(
      v-model="shipping.name"
      label="Recipient Name"
      type="text"
    )
    FormInput(
      v-model="shipping.address.country"
      label="Country"
      type="text"
    )
    FormInput(
      v-model="shipping.address.street"
      label="Street"
      type="text"
    )
    FormInput(
      v-model="shipping.address.city"
      label="City"
      type="text"
    )
    FormInput(
      v-model="shipping.address.state"
      label="State"
      type="text"
    )
    FormInput(
      v-model="shipping.address.zip"
      label="Zip"
      type="number"
    )
    FormInput(
      v-model="shipping.address.number"
      label="Number"
      type="text"
    )
    FormInput(
      v-model="shipping.address.complement"
      label="Complement"
      type="text"
    )
    FormInput(
      v-model="shipping.phone"
      label="Phone"
      type="tel"
    )
    FormInput(
      v-model="shipping.email"
      label="Email"
      type="email"
    )
    FormInput(
      v-model="shipping.cost"
      label="Shipping Cost"
      type="number"
    )
  fieldset.sale-form__outlet
    legend Outlet
    FormSelect(
      v-model="newSale.outletId"
      label="Outlet"
      name="outlet"
      :options="outletOptions"
    )
  fieldset.sale-form__seller(v-if="!newSale.outletId")
    legend Seller
    FormSelect(
      v-model="newSale.sellerId"
      label="Seller"
      name="seller"
      :options="sellerOptions"
    )
  button Submit Sale
</template>

<style lang="scss" scoped>
.sale-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__shipping{
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    > *{
      flex-grow: 1;
    }
  }
}
</style>
