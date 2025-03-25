<script setup lang="ts">
defineProps<{
  modelValue: string,
  placeholder?: string,
  info?: string,
  error?: string,
}>()

const emit = defineEmits(['update:modelValue', 'update:latLng'])

const address = ref('')
const result = ref(null)
const latlng = ref(null)
const center = ref([19.419444444444, -99.145555555556])
const zoom = ref(6)

const searchAddress = async () => {
  result.value = await $fetch('/api/geocode', {
    method: 'POST',
    body: { address: address.value },
  })
}

const buildAddress = () => {
  return `${result.value?.features[0].properties.formatted}`
}

const selectResult = () => {
  latlng.value = result.value?.features[0].properties.lat + ',' + result.value?.features[0].properties.lon
  center.value = latlng.value.split(',')
  zoom.value = 16
  emit('update:modelValue', buildAddress())
  emit('update:latLng', latlng.value)
}

const getAddress = async (lat: number, lon: number) => {
  result.value = await $fetch('/api/geocode/reverse', {
    method: 'POST',
    body: { lat, lon },
  })
}

const setLatLng = async (e: { latlng: { lat: number, lng: number } }) => {
  latlng.value = `${e.latlng.lat}, ${e.latlng.lng}`
  await getAddress(e.latlng.lat, e.latlng.lng)
  center.value = latlng.value.split(',')
  zoom.value = 16
  emit('update:modelValue', buildAddress())
  emit('update:latLng', latlng.value)
}
</script>

<template lang="pug">
.sk-geocoder
  label.sk-geocoder__label
    input.sk-geocoder__input(type="text" v-model="address")
    span.sk-geocoder__label__span Search Address

  button.sk-geocoder__button(@click="searchAddress" type="button") Search
  ClientOnly
    LMap.sk-geocoder__map(
      ref="map"
      :zoom="zoom"
      :center="center"
      :use-global-leaflet="false"
      @click="setLatLng"
    )
      LMarker(v-if="latlng" :lat-lng="latlng.split(',')")
      LTileLayer(
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; link contributors"
        layer-type="base"
        name="OpenStreetMap"
      )
  ul.sk-geocoder__results(v-if="result")
    li.sk-geocoder__result
      button(@click="selectResult" type="button") {{ result.features[0].properties.name }}
</template>

<style scoped lang="scss">
.sk-geocoder{
  position: relative;
  &__input{
    height: unit(40);
    padding-left: unit(16);
    padding-right: unit(16);
    padding-top: unit(4);
    border: unit(2) solid $color-board;
    border-radius: unit(100);
    font-size: unit(16);
    margin-bottom: unit(20);
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

  &__button{
    padding: unit(8) unit(16);
    background-color: $color-primary-bg-dark;
    color: #FFF;
    border: none;
    border-radius: unit(100);
    font-size: unit(16);
  }

  &__map{
    height: unit(300)!important;
    background-color: #eee;
  }
}
</style>
