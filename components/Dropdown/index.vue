<script lang="ts" setup>
const id = new Date().getTime().toString()
const show = ref(false)

const { activeItems, toggle } = inject('dropdownGroup', { activeItems: null, toggle: (_: string) => show.value = !show.value }) as any

const isActive = computed(() => {
  if (activeItems) {
    return activeItems.value.includes(id)
  }
  return show.value
})

</script>

<template lang="pug">
.dropdown
  .dropdown__label
    button.dropdown__label__button(@click="toggle(id)")
      slot(name="label")
    slot(name="actions")
  div.dropdown__content(:class="{ show: isActive }")
    slot(name="content")
</template>


<style lang="scss" scoped>
.dropdown {
  position: relative;
  cursor: pointer;
  background-color: #cecece;
  border-radius: unit(10);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  &__label {
    display: flex;
    justify-content: space-between;
    &__button{
      width: 100%;
      display: inline-flex;
      border: none;
      padding: unit(10);
      font-size: unit(16);
      cursor: pointer;
      background-color: transparent;
    }
  }

  &__content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;

    &.show {
      max-height: 200vh;
    }
  }
}
</style>