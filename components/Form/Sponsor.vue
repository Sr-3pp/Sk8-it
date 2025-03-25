<script setup lang="ts">
const props = defineProps<{
  modelValue: string[],
  placeholder?: string,
  info?: string,
  error?: string,
}>()

const sponsor = ref({
  name: '',
  facebook: '',
  x: '',
  instagram: '',
  youtube: '',
  website: '',
})
const emit = defineEmits(['update:modelValue'])

const validateSponsor = () => {
  if (!sponsor.value.name) {
    return false
  }
  return true
}

const updateValue = () => {
  if (!validateSponsor()) return
  const newValue = [...props.modelValue]
  newValue.push({ ...sponsor.value })
  emit('update:modelValue', newValue)
}

const removeItem = (idx: number) => {
  const newValue = [...props.modelValue]
  newValue.splice(idx, 1)
  emit('update:modelValue', newValue)
}
</script>

<template lang="pug">
.sk-sponsor-input
  label.sk-sponsor-input__label
    input.sk-sponsor-input__input(type="text" v-model="sponsor.name")
    span.sk-sponsor-input__label__span Name
  label.sk-sponsor-input__label
    input.sk-sponsor-input__input(type="text" v-model="sponsor.facebook")
    span.sk-sponsor-input__label__span Facebook
  label.sk-sponsor-input__label
    input.sk-sponsor-input__input(type="text" v-model="sponsor.x")
    span.sk-sponsor-input__label__span X
  label.sk-sponsor-input__label
    input.sk-sponsor-input__input(type="text" v-model="sponsor.instagram")
    span.sk-sponsor-input__label__span Instagram
  label.sk-sponsor-input__label
    input.sk-sponsor-input__input(type="text" v-model="sponsor.youtube")
    span.sk-sponsor-input__label__span Youtube
  label.sk-sponsor-input__label
    input.sk-sponsor-input__input(type="text" v-model="sponsor.website")
    span.sk-sponsor-input__label__span Website
  button.sk-sponsor-input__button(@click="updateValue" type="button") Add Sponsor
  span.sk-sponsor-input__message(v-if="error || info")
    | {{ error || info }}
  ul.sk-sponsor-input__list
    li.sk-sponsor-input__list__item(v-for="(item, i) in modelValue")
      div(v-for="([key, value], i) in Object.entries(item)")
        p {{ key }}:
        input.sk-sponsor-input__input(v-model="item[key]")
      button.sk-sponsor-input__remove(@click="removeItem(i)" type="button") x
</template>

<style scoped lang="scss">
.sk-sponsor-input{
  display: flex;
  gap: unit(16);
  flex-wrap: wrap;
  position: relative;
  &__label{
    position: relative;
  }

  &__input{
    height: unit(40);
    padding-left: unit(16);
    padding-right: unit(16);
    padding-top: unit(4);
    border: unit(2) solid $color-board;
    border-radius: unit(100);
    font-size: unit(16);
  }
  &__label__span{
    display: block;
    color: #FFF;
    position: absolute;
    top: 0;
    left: unit(16);
    transform: translateY(-50%);
    background-color: $color-primary-bg-dark;
    padding: unit(2) unit(4);
    font-weight: bold;
    font-size: unit(12);
    border-radius: unit(36);
  }

  &__list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: unit(16);
    list-style: none;
    padding: 0;

    &__item{
      display: flex;
      flex-direction: column;
      gap: unit(16);
      padding: unit(16);
      border: unit(2) solid $color-board;
      border-radius: unit(16);
      flex-basis: calc((100% / 3) - unit(48));
      flex-shrink: 1;
      flex-grow: 1;

      >div{
        display: flex;
        flex-direction: column;
      }

      p{
        display: flex;
        margin: 0;
        flex-direction: column;
        padding-left: unit(20);
      }
    }
  }
}
</style>
