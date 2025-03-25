<script setup lang="ts">
const newSkater = ref({
  name: '',
  age: 0,
  country: '',
  stance: 'Regular',
  instagram: '',
  x: '',
  facebook: '',
  youtube: '',
})

const emit = defineEmits(['user-added'])

const handleSkater = async () => {
  const { data } = await $fetch('/api/skaters', {
    method: 'POST',
    body: newSkater.value,
  })

  if (data.id) {
    emit('user-added', data)
    newSkater.value = {
      name: '',
      age: 0,
      country: '',
      stance: 'Regular',
      instagram: '',
      x: '',
      facebook: '',
      youtube: '',
    }
  }
}

const openGallery = () => {
  console.log('openGallery')
}
</script>

<template>
  <form @submit.prevent="handleSkater">
    <button type="button" @click="openGallery">CHoose picture</button>
    <label>
      <span>Name</span>
      <input v-model="newSkater.name" type="text" />
    </label>
    <label>
      <span>Age</span>
      <input v-model="newSkater.age" type="number" />
    </label>
    <CountrySelector v-model="newSkater.country" />
    <label>
      <span>Stance</span>
      <select v-model="newSkater.stance">
        <option>Regular</option>
        <option>Goofy</option>
      </select>
    </label>
    <fieldset>
      <legend>Social</legend>
      <label>
        <span>Instagram</span>
        <input v-model="newSkater.instagram" type="text" />
      </label>
      <label>
        <span>X</span>
        <input v-model="newSkater.x" type="text" />
      </label>
      <label>
        <span>Facebook</span>
        <input v-model="newSkater.facebook" type="text" />
      </label>
      <label>
        <span>Youtube</span>
        <input v-model="newSkater.youtube" type="text" />
      </label>
    </fieldset>
    <button type="submit">Add</button>
  </form>
</template>

<style scoped></style>
