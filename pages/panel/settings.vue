<script setup lang="ts">
import type { Category } from '~~/server/utils/drizzle'

const _useCategory = await useCategory()
const { categories } = toRefs(_useCategory)
const { addCategory, deleteCategory } = _useCategory

const _useSubcategory = await useSubcategory(
  (categories.value[0] as Category).id,
)
const { subcategories } = toRefs(_useSubcategory)
const { addSubcategory, deleteSubcategory, getSubcategories } = _useSubcategory

const updateSubcategories = (categoryId: number) => {
  getSubcategories(categoryId)
}
</script>

<template>
  <div>
    <div>
      <h2>Cotegories</h2>
      <CategoryForm @add-category="addCategory" />
      <CategoryList
        :categories="categories"
        @delete-category="deleteCategory"
      />
    </div>
    <div>
      <h2>Subcateroies</h2>
      <SubcategoryForm
        :categories="categories"
        @add-subcategory="addSubcategory"
        @get-subcategories="getSubcategories"
      />
      <SubcategoryList
        :subcategories="subcategories"
        @update-subcategories="updateSubcategories"
        @delete-subcategory="deleteSubcategory"
      />
    </div>
  </div>
</template>

<style scoped></style>
