<script setup lang="ts">
import Gallery from '../Gallery.vue'
import Modal from '../Modal.vue'
import type { Category, Product, Subcategory } from '~~/server/utils/drizzle'

defineProps<{
  categories: Category[]
  subcategories: Subcategory[]
}>()

const emit = defineEmits(['get-subcategories', 'add-product', 'delete-model'])

const gallery = ref<InstanceType<typeof Gallery> | null>(null)
const productForm = ref<InstanceType<typeof Modal> | null>(null)

const newProduct = ref<{
  id?: number
  name: string
  price: number
  cost: number
  thumbs: string[]
  categoryId: number
  subcategoryId: number
  description?: string
  boards?: Array<{ id?: number, description: string, size: string, shape: string, stock: number }>,
  clothes?: Array<{ id?: number, description: string, size: string, color: string, stock: number }>,
}>({
  name: '',
  price: 0,
  cost: 0,
  thumbs: [],
  categoryId: 1,
  subcategoryId: 0,
})

const newBoard = ref({
  size: '',
  shape: '',
  description: '',
  stock: 0,
})

const newClothe = ref({
  size: '',
  color: '',
  description: '',
  stock: 0,
})

const boardSizes = ['7.25', '8', '8.25', '8.5', '8.75', '9']
const boardShapes = ['street', 'Old School', 'Cruiser', 'Fish', 'Popsicle']

const clotheSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const handleProduct = async () => {
  const productPayload = {
    name: newProduct.value.name,
    cost: newProduct.value.cost,
    price: newProduct.value.price,
    thumbs: JSON.stringify(newProduct.value.thumbs),
    categoryId: newProduct.value.categoryId,
    subcategoryId: newProduct.value.subcategoryId,
  }

  const model: Array<{ [key: string]: string | number, }> | undefined = newProduct.value.categoryId === 1
    ? newProduct.value.boards
    : newProduct.value.clothes

  const productData = {
    product: productPayload,
    model,
  }

  emit('add-product', productData)

  newProduct.value = {
    name: '',
    price: 0,
    cost: 0,
    thumbs: [],
    categoryId: 1,
    subcategoryId: 0,
  }
}

const addThumb = () => {
  gallery.value?.toggleGallery()
}

const setPicture = (img: { pathname: string }) => {
  newProduct.value.thumbs.push(`/blob/${img.pathname}`)
}

const addModel = (key: string) => {
  if (key == 'board') {
    if (newProduct.value.boards) {
      newProduct.value.boards.push({ ...newBoard.value })
    } else {
      newProduct.value.boards = [{ ...newBoard.value }]
    }

    newBoard.value = {
      size: '',
      shape: '',
      description: '',
      stock: 0,
    }
  } else {
    if (newProduct.value.clothes) {
      newProduct.value.clothes.push({ ...newClothe.value })
    } else {
      newProduct.value.clothes = [{ ...newClothe.value }]
    }

    newClothe.value = {
      size: '',
      color: '',
      description: '',
      stock: 0,
    }
  }
}

const openForm = (product?: (Product & { boards?: Array<{ description: string, size: string, shape: string }>, clothes?: Array<{ description: string, size: string, color: string }> }) | undefined | null) => {
  if (product) {
    newProduct.value = {
      name: product.name,
      price: product.price,
      cost: product.cost as number,
      thumbs: JSON.parse(product.thumbs || '[]'),
      categoryId: product.categoryId as number,
      subcategoryId: product.subcategoryId as number,
    }

    if (product.categoryId === 1) {
      newProduct.value.boards = product.boards as [] || []
    } else {
      newProduct.value.clothes = product.clothes as [] || []
    }
  } else {
    newProduct.value = {
      name: '',
      price: 0,
      cost: 0,
      thumbs: [],
      categoryId: 1,
      subcategoryId: 0,
      boards: [],
      clothes: [],
    }
  }
  productForm.value?.toggleDialog()
}

defineExpose({
  openForm,
})

const modelDeleteHandler = async (modelId: number, modelType: 'Board' | 'Clothe') => {
  await deleteModel(newProduct.value.id!, modelId, modelType)
  newProduct.value = {
    ...newProduct.value,
    boards: newProduct.value.boards?.filter(board => board.id !== modelId),
    clothes: newProduct.value.clothes?.filter(clothe => clothe.id !== modelId),
  }
}

const handleCategoryChange = () => {
  emit('get-subcategories', newProduct.value.categoryId)
  newProduct.value.subcategoryId = 0
  newProduct.value.boards = []
  newProduct.value.clothes = []
}

const { deleteModel } = await useProduct()
</script>

<template>
  <button @click="openForm()">
    New Product
  </button>
  <Modal ref="productForm">
    <template #header>
      <h2>{{ newProduct.name || 'New Product' }}</h2>
    </template>
    <template #body>
      <form @submit.prevent="handleProduct">
        <ul class="product-form__thumbs">
          <li class="product-form__thumb">
            <button type="button" @click="addThumb">Add thumbs</button>
          </li>
          <li v-for="(thumb, i) in newProduct.thumbs" :key="thumb" class="product-form__thumb">
            <img :src="thumb" alt="" />
            <button type="button" @click="newProduct.thumbs.splice(i, 1)">
              delete
            </button>
          </li>
        </ul>
        <label>
          <span>Name</span>
          <input v-model="newProduct.name" type="text" />
        </label>
        <label>
          <span>Category</span>
          <select
            v-model="newProduct.categoryId"
            @change="handleCategoryChange"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </label>
        <label v-if="newProduct.categoryId">
          <span>Subcategory</span>
          <select v-model="newProduct.subcategoryId" required>
            <option value="0">Select a subcategory</option>
            <option
              v-for="subcategory in subcategories"
              :key="subcategory.id"
              :value="subcategory.id"
            >
              {{ subcategory.name }}
            </option>
          </select>
        </label>

        <template v-if="newProduct.categoryId == 1">
          <fieldset>
            <legend>Boards</legend>
            <label>
              <span>Description</span>
              <textarea v-model="newBoard.description" />
            </label>
            <label>
              <span>Size</span>
              <select v-model="newBoard.size">
                <option value="">Select a size</option>
                <option v-for="size in boardSizes" :key="size" :value="size">
                  {{ size }}
                </option>
              </select>
            </label>
            <label>
              <span>Shape</span>
              <select v-model="newBoard.shape">
                <option value="">Select a shape</option>
                <option v-for="shape in boardShapes" :key="shape" :value="shape">
                  {{ shape }}
                </option>
              </select>
            </label>
            <label>
              <span>Stock</span>
              <input v-model="newBoard.stock" type="number">
            </label>
            <button type="button" @click="addModel('board')">
              Add Board
            </button>
            <div v-for="(board, i) in newProduct.boards" :key="i">
              <label>
                <span>Description</span>
                <textarea v-model="board.description" />
              </label>
              <label>
                <span>Size</span>
                <select v-model="board.size">
                  <option value="">Select a size</option>
                  <option v-for="size in boardSizes" :key="size" :value="size">
                    {{ size }}
                  </option>
                </select>
              </label>
              <label>
                <span>Shape</span>
                <select v-model="board.shape">
                  <option value="">Select a shape</option>
                  <option v-for="shape in boardShapes" :key="shape" :value="shape">
                    {{ shape }}
                  </option>
                </select>
              </label>
              <label>
                <span>Stock</span>
                <input v-model="board.stock" type="number">
              </label>
              <button type="button" @click="modelDeleteHandler(board.id!, 'Board')">
                Remove Board
              </button>
            </div>
          </fieldset>
        </template>

        <template v-if="newProduct.categoryId == 2">
          <fieldset>
            <legend>Clothe</legend>
            <label>
              <span>Description</span>
              <textarea v-model="newClothe.description" />
            </label>
            <label>
              <span>Size</span>
              <select v-model="newClothe.size">
                <option value="">Select a size</option>
                <option v-for="size in clotheSizes" :key="size" :value="size">
                  {{ size }}
                </option>
              </select>
            </label>
            <label>
              <span>Color</span>
              <input v-model="newClothe.color" type="color" />
            </label>
            <label>
              <span>Stock</span>
              <input v-model="newClothe.stock" type="number">
            </label>
            <button type="button" @click="addModel('clothe')">
              Add Clothe
            </button>
            <div v-for="(clothe, i) in newProduct.clothes" :key="i">
              <label>
                <span>Description</span>
                <textarea v-model="clothe.description" />
              </label>
              <label>
                <span>Size</span>
                <select v-model="clothe.size">
                  <option value="">Select a size</option>
                  <option v-for="size in clotheSizes" :key="size" :value="size">
                    {{ size }}
                  </option>
                </select>
              </label>
              <label>
                <span>Color</span>
                <input v-model="clothe.color" type="color" />
              </label>
              <label>
                <span>=Stock</span>
                <input v-model="clothe.stock" type="number">
              </label>
              <button type="button" @click="modelDeleteHandler(clothe.id!, 'Clothe')">
                Remove Clothe
              </button>
            </div>
          </fieldset>
        </template>

        <label>
          <span>Price</span>
          <input v-model="newProduct.price" type="number" />
        </label>
        <label>
          <span>Cost</span>
          <input v-model="newProduct.cost" type="number" />
        </label>
        <button>Add product</button>
      </form>
    </template>
  </Modal>
  <Gallery ref="gallery" @set-picture="setPicture" />
</template>

<style scoped lang="scss">
.product-form{
  &__thumbs{
    list-style: none;
    display: flex;
    gap: 1rem;
  }
  &__thumb{
    position: relative;
    width: 100px;
    height: 100px;

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    button{
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
