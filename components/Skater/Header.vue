<script setup lang="ts">
defineProps<{
  name: string
  image: string
  age: number
  stance: string
  country: string
  social: {
    instagram: string
    facebook: string
    twitter: string
  }
}>()
</script>

<template lang="pug">
article.skater-header
  figure.skater-header__image
    img.picture(:src="image" :alt="name")
    span.flag
        img(:src="`https://flagsapi.com/${country}/flat/64.png`" :alt="country")
  div.skater-header__info
    h1.skater-header__title {{ name }}
    p Age: {{ age }}
    p Stance: {{ stance }}
    ul.skater-header__social(v-if="social")
      li(v-for="key in Object.keys(social)" :key="social.name")
        a(:href="social[key]")
          Icon(:name="key")
</template>

<style scoped lang="scss">
.skater-header{
  --border-color: #{$color-board};
  --border-width: unit(4);
  width: 100%;
  padding: unit(20);
  max-width: unit(600);
  margin: auto;
  display: flex;
  gap: unit(20);
  justify-content: center;
  color: $color-primary-text-light;
  background-color: $color-primary-bg-dark;
  border: {
    width: var(--border-width);
    style: solid;
    color: var(--border-color);
    radius: unit(16);
  }
  &__image {
    position: relative;
    width: 30%;
    max-width: unit(300);
    margin: 0;
    margin-bottom: unit(16);
    
    .picture{
      overflow: hidden;
      width: 100%;
      height: 100%;
      overflow: hidden;
      object-fit: cover;
      border: {
        style: solid;
        color: var(--border-color);
        radius: unit(999);
        width: unit(4)
      }
    }

    .flag{
      display: flex;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
      width: unit(40);
      height: unit(40);
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  &__title {
    font-size: 2rem;
    text-align: center;
    margin: 0;
  }
  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: unit(20);
    padding-left: unit(20);
    padding-right: unit(20);

    p{
      margin: 0
    }
  }

  &__social {
    margin: 0;
    display: flex;
    gap: unit(10);
    justify-content: center;
    align-items: center;
    padding: 0;
    list-style: none;
    li {
      a {
        color: $color-primary-text-light;
        text-decoration: none;
      }
    }
  }
}
</style>
