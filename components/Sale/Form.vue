<script setup lang="ts">
const newSale = ref<{
  products: Array<{ id: number, name: string, quantity: number, price: number, model: { id: number, size: number, shape: string } | { id: number, size: number, color: string } }>,
  total: number,
  outletId: number,
}>({
  products: [],
  total: 0,
  outletId: 0,
})

const currentProduct = ref<(Product & {
  boards?: [];
  clothes?: [],
  model: { id: number, size: number, shape: string } | { id: number, size: number, color: string }
}) | null>(null)
const productModels = computed<Array<{ id: number, size: number, shape: string } | { id: number, size: number, color: string }>>(() => {
  if (!currentProduct.value) return []
  return currentProduct.value.boards || currentProduct.value.clothes || []
})
const seller = ref<Skater | null>(null)

const handleSale = () => {
  console.log('Sale', newSale.value)
}

const addProduct = () => {
  if (!currentProduct.value || !currentProduct.value.model) return
  if (newSale.value.products.some(product => product.model.id === currentProduct.value!.model.id)) return

  newSale.value.products.push({
    id: currentProduct.value.id,
    name: currentProduct.value.name,
    quantity: 1,
    price: currentProduct.value.price,
    model: currentProduct.value.model,
  })
}

const getComision = (price: number, quantity: number) => {
  return price * 0.25 * quantity
}

const { products } = await useProduct()
const { skaters } = await useSkater()
</script>

<template>
  <form @submit.prevent="handleSale">
    <select v-model="currentProduct">
      <option :value="null">Select a product</option>
      <option v-for="product in products" :key="product.id" :value="product">{{ product.name }}</option>
    </select>
    <select v-if="currentProduct" v-model="currentProduct.model">
      <option value="">Select a model</option>
      <option v-for="model in productModels" :key="model.id" :value="model">
        {{ model.size }} - {{ 'shape' in model ? model.shape : model.color }}
      </option>
    </select>
    <button type="button" @click="addProduct">
      Add product
    </button>
    <fieldset>
      <legend>Products</legend>
      <div v-for="(product, i) in newSale.products" :key="product.id">
        <span>{{ product.name }} {{ product.model.size }}</span>
        <label>
          <span>
            Quantity
          </span>
          <input v-model="product.quantity" type="number" />
        </label>
        <span>
          Price: {{ product.price }}
          Seller: {{ seller?.name }}
        </span>
        <span>
          Total: {{ product.quantity * product.price }}
          {{ seller ? `- comision ${getComision(product.price, product.quantity)} ${product.quantity * product.price - (getComision(product.price, product.quantity))}` : '' }}
        </span>
        <button @click="newSale.products.splice(i, 1)">
          Remove
        </button>
      </div>
    </fieldset>
    <fieldset>
      <legend>Shipping</legend>
      <label>
        <input type="text" placeholder="Shipping name">
      </label>
    </fieldset>
    <fieldset>
      <legend>Outlet</legend>
      <label>
        <span>Outlet</span>
        <select>
          <option value="1">Outlet name</option>
        </select>
      </label>
    </fieldset>
    <fieldset>
      <legend>
        Seller
      </legend>
      <label>
        <select v-model="seller">
          <option value="">Select seller</option>
          <option v-for="skater in skaters" :key="skater.id" :value="skater">
            {{ skater.name }}
          </option>
        </select>
      </label>
    </fieldset>
  </form>
</template>

<style scoped></style>
