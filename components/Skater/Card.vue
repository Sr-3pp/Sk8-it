<script setup lang="ts">
defineProps<{
  slug: string;
  name: string;
  age: number;
  stance: string;
  sponsors: string[];
  country: string;
  image: string;
  social: {
    instagram: string;
    twitter: string;
    facebook: string;
  };
  test: boolean;
}>();
</script>

<template lang="pug">
article.skater-card
  NuxtLink(:to="`/team/${slug}`")
    figure.skater-card__image
      img.picture(:src="image" :alt="name" :class="{wtransition: test}")
      span.flag
        img(:src="`https://flagsapi.com/${country}/flat/64.png`" :alt="country")

    h3.skater-card__title {{ name }}
    div.skater-card__info
      p Age: {{ age }}
      p Stance: {{ stance }}
    ul.skater-card__sponsors
      li.skater-card__sponsor(v-for="sponsor in sponsors" :key="sponsor") {{ sponsor }}
  ul.skater-card__social
    li.skater-card__social--item(v-if="social.instagram")
      a(:href="`https://instagram.com/${social.instagram}`" target="_blank")
        Icon(name="instagram")
    li.skater-card__social--item(v-if="social.twitter")
      a(:href="`https://x.com/${social.twitter}`" target="_blank")
        Icon(name="x")
    li.skater-card__social--item(v-if="social.facebook")
      a(:href="`https://facebook.com/${social.facebook}`" target="_blank")
        Icon(name="facebook")
</template>

<style scoped lang="scss">
.skater-card {
  --border-color: #{$color-board};
  --border-width: unit(4);
  width: 100%;
  display: flex;
  flex-direction: column;
  color: $color-primary-text-light;
  background-color: $color-primary-bg-dark;
  border: {
    width: var(--border-width);
    style: solid;
    color: var(--border-color);
    radius: unit(16);
  }

  * {
    color: currentColor;
  }

  > a {
    height: 100%;
    padding: unit(20);
    display: flex;
    flex-direction: column;
    gap: unit(20);
    text-decoration: none;
  }

  &__image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-top: 0;
    margin-bottom: unit(30);
    margin-right: auto;
    position: relative;

    .picture {
      width: 100%;
      object-fit: cover;
      border: {
        width: var(--border-width);
        style: solid;
        color: var(--border-color);
        radius: 50%;
      }
      width: 50%;
      aspect-ratio: 1 / 1;

      &.wtransition {
        view-transition-name: skater-picture;
        transition: width 0.3s ease-in-out;
      }
    }

    .flag {
      width: unit(30);
      height: unit(30);
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border: {
        width: var(--border-width);
        style: solid;
        color: var(--border-color);
        radius: 50%;
      }
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);

      img {
        height: 175%;
        object-fit: cover;
      }
    }
  }

  &__title {
    font-size: unit(20);
    text-align: center;
    margin: 0;
  }

  &__info {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: unit(20);
    text-align: center;

    p {
      margin: 0;
    }
  }

  &__sponsors {
    display: flex;
    justify-content: center;
    list-style: none;
    color: $color-primary-text-light;
    gap: unit(10);
    padding: 0;
  }

  &__sponsor {
    background-color: rgba($color-primary-text-light, 0.4);
    padding: unit(10) unit(20);
    border-radius: unit(24);
  }

  &__social {
    padding: 0;
    display: flex;
    justify-content: center;
    list-style: none;
    background-color: $color-board;
    color: $color-primary-text-light;
    margin-bottom: unit(20);
    padding: unit(10);
    gap: unit(20);
    border: {
      width: var(--border-width);
      style: solid;
      color: $color-primary-bg-dark;
    }
    a {
      display: flex;
    }
  }
}
</style>
