<script lang="ts" setup>
const { data } = await useFetch('/api/trick-menu')
const { data: trickMenu } = data.value!
import Modal from '~/components/Modal.vue'

const trickModal = ref<typeof Modal | null>(null)

const newTrick = ref({
  name: '',
  description: '',
  price: 0,
  spot: '',
  difficulty: 0
})

const handleTrick = () => {
  // Handle trick action here
  trickModal.value!.toggleDialog()
}

const addTrick = async () => {
  // Add trick logic here
  const addedTrick = await $fetch('/api/trick-menu', {
    method: 'POST',
    body: newTrick.value
  })

  trickMenu.push(addedTrick)

  trickModal.value!.toggleDialog()

  newTrick.value = {
    name: '',
    description: '',
    price: 0,
    spot: '',
    difficulty: 0
  }
}

</script>

<template lang="pug">
.trick-menu
  h1 Trick Menu
  button(@click="handleTrick")
    Icon(name="plus")
    span Add Trick
  ul
    li(v-for="item in trickMenu" :key="item.id")
      a(:href="`/trick/${item.id}`") {{ item.name }}
      p {{ item.description }}

  Modal(ref="trickModal")
    template(#body)
      h2 Add Trick
      form(@submit.prevent="addTrick")
        FormInput(label="Name" type="text" v-model="newTrick.name")
        FormInput(label="Description" type="textarea" v-model="newTrick.description")
        FormInput(label="Price" type="number" v-model="newTrick.price") 
        FormGeocoder(label="Spot" v-model="newTrick.spot")
        FormInput(label="Difficulty" type="number" v-model="newTrick.difficulty")
        button(type="submit") Submit
</template>

<style>

</style>