<script setup lang="ts">
const props = defineProps({
  navigation: {
    type: Array,
    default: () => []
  }
});
</script>

<template lang="pug">
.footer
  Container(:with-padding="true")
    .footer__content
      Logo
      ul.footer__nav
        li.footer__item(v-for="(item, i) in navigation" :key="item.id")
          div.footer__item__content
            span.footer__nav__link(v-if="'page' in item") {{ item.title }}
            NuxtLink.footer__nav__link(v-else :to="item.path") {{ item.title }}
            button.footer__item__button(@click="subActive == i ? subActive = -1 : subActive = i" v-if="item.children")
              Icon(name="chevron-down")
          ol.footer__submenu(v-if="item.children" :class="{ active: subActive == i }")
            li.footer__submenu__item(v-for="subitem in item.children" :key="subitem.id")
              NuxtLink.footer__nav__link(:to="subitem.path") {{ subitem.title }}
    .footer__bottom
      p.footer__text © 2021
      p.footer__text Made with ❤️ by Sr3pp
</template>

<style scoped lang="scss">
.footer{
  background-color: $color-board;
  color: $color-primary-text-dark;

  .logo{
    width: unit(200);
  }

  &__content{
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }

  &__nav {
    display: flex;
    gap: 1rem;
  }

  &__item {
    display: flex;
    gap: 1rem;
    align-items: center;
    cursor: pointer;

    &__content {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    &__button {
      background-color: transparent;
      border: none;
      color: $color-primary-text-dark;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &__bottom{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
