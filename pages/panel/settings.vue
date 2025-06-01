<script setup lang="ts">
const { getCategories, addCategory, deleteCategory } = await useCategory()
const { data: categories } = await getCategories()

const { getSubcategories, addSubcategory, deleteSubcategory } = useSubcategory()
const { data: subcategories } = await getSubcategories(categories.value![0].id)

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
        :categories="categories ?? []"
        @delete-category="deleteCategory"
      />
    </div>
    <div>
      <h2>Subcateroies</h2>
      <SubcategoryForm
        :categories="categories ?? []"
        @add-subcategory="addSubcategory"
        @get-subcategories="getSubcategories"
      />
      <SubcategoryList
        :subcategories="subcategories ?? []"
        @update-subcategories="updateSubcategories"
        @delete-subcategory="deleteSubcategory"
      />
    </div>
  </div>
</template>

<style scoped></style>
