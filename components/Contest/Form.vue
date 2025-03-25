<script setup lang="ts">
import type { Contest } from '~/types/contest'

const { saveContest } = useContest()

const contest = ref<Contest>({
  modes: [],
  name: '',
  banner: '',
  date: '',
  cost: 0,
  address: '',
  latlng: '',
  description: '',
  prizes: ['', '', ''],
  sponsors: [],
  status: false,
})

const validateForm = () => {
  if (!contest.value.name) {
    return false
  }
  if (!contest.value.date) {
    return false
  }
  if (!contest.value.cost) {
    return false
  }
  if (!contest.value.address) {
    return false
  }
  if (!contest.value.description) {
    return false
  }
  if (!contest.value.prizes[0]) {
    return false
  }
  if (!contest.value.prizes[1]) {
    return false
  }
  if (!contest.value.prizes[2]) {
    return false
  }
  if (!contest.value.sponsors.length) {
    return false
  }
  return true
}

const emit = defineEmits(['add:contest'])

const _submit = async () => {
  if (validateForm()) {
    const formData = new FormData();

    Object.keys(contest.value).forEach((key) => {
      if (key === 'sponsors') {
        formData.append('sponsors', JSON.stringify(contest.value.sponsors));
      } else if (key === 'modes') {
        formData.append('modes', JSON.stringify(contest.value.modes));
      } else {
        formData.append(key, contest.value[key]);
      }
    });


    const response = await saveContest(formData)
    if (response) {
      emit('add:contest', response)
      contest.value = {
        modes: [],
        name: '',
        banner: '',
        date: '',
        cost: 0,
        address: '',
        latlng: '',
        description: '',
        prizes: ['', '', ''],
        sponsors: [],
        status: false,
      }
    }
  } else {
    console.log('Form is invalid')
  }
}
</script>

<template lang="pug">
form.contest-form(@submit.prevent="_submit")
  fieldset.contest-form__group
    legend Contest Details
    FormInput(label="Name" type="text" v-model="contest.name")
    FormInput(label="Banner" type="file" @change="contest.banner = $event.target.files[0]" accept="image/*")
    FormBox(label="S.K.A.T.E" type="checkbox" value="skate" v-model="contest.modes")
    FormBox(label="Line" type="checkbox" value="line" v-model="contest.modes")
    FormBox(label="Best Trick" type="checkbox" value="best-trick" v-model="contest.modes")
  fieldset.contest-form__group
    legend Contest Date and Cost
    FormInput(label="Date" type="date" v-model="contest.date")
    FormInput(label="Cost" type="number" v-model="contest.cost")
  fieldset.contest-form__group.location
    legend Contest Location
    p {{ contest.address }}
    FormGeocoder(v-model="contest.address" @update:latLng="contest.latlng = $event")
  fieldset.contest-form__group
    legend Contest Description
    FormInput(label="description" type="textarea" v-model="contest.description")
  fieldset.contest-form__group
    legend Contest Prizes
    FormInput(label="1st Place" type="text" v-model="contest.prizes[0]")
    FormInput(label="2nd Place" type="text" v-model="contest.prizes[1]")
    FormInput(label="3rd Place" type="text" v-model="contest.prizes[2]")
  fieldset.contest-form__group
    legend Sponsors
    FormSponsor(v-model="contest.sponsors")
  button.contest-form__submit(type="submit") Submit
</template>

<style scoped lang="scss">
.contest-form{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  &__group{
    display: flex;
    flex-wrap: wrap;
    gap: unit(16);

    > *:not(legend):not(.sk-sponsor-input){
      flex-basis: calc(100% / 3 - unit(16));
      flex-shrink: 1;
      flex-grow: 1;
    }

    &.location{
      flex-direction: column;
    }
  }
  &__map{
    height: 10rem;
    background-color: #eee;
  }
  &__submit{
    align-self: center;
    padding: 0.5rem 1rem;
    background-color: #2196F3;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }
}
</style>
