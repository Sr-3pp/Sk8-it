<script setup lang="ts">
defineProps({
  navigation: {
    type: Array,
    default: () => []
  }
});

const isActive = ref(false);
const subActive = ref(-1);
</script>

<template lang="pug">
header.navbar
  .navbar__container
    nav.navbar__nav
      figure.navbar__logo
        NuxtLink(to="/")
          Logo
      button.navbar__burger(@click="isActive = !isActive")
        Icon(name="burger-menu")
      ul.navbar__menu(:class="{ active: isActive }")
        li.navbar__menu__item.close
          button.navbar__menu__item__button(@click="isActive = !isActive")
            Icon(name="close")
        li.navbar__menu__item(v-for="(item, i) in navigation" :class="{active: subActive == i}" :key="item.id")
          div.navbar__menu__item__content
            span.navbar__nav__link(v-if="'page' in item") {{ item.title }}
            NuxtLink.navbar__nav__link(v-else :to="item.path") {{ item.title }}
            button.navbar__menu__item__button(@click="subActive == i ? subActive = -1 : subActive = i" v-if="item.children")
              Icon(name="chevron-down")
          ol.navbar__submenu(v-if="item.children" :class="{ active: subActive == i }")
            li.navbar__submenu__item(v-for="subitem in item.children" :key="subitem.id")
              NuxtLink.navbar__nav__link(:to="subitem.path") {{ subitem.title }}
  .navbar__backdrop(:class="{ active: isActive }" @click="isActive = !isActive")
</template>

<style scoped lang="scss">
.navbar {
  position: sticky;
  top: 0;
  z-index: 99;

  &__top {
    background-color: $color-board;
    display: flex;
    gap: 1rem;
  }

  &__burger {
    width: unit(40);
    height: unit(40);
    margin-left: auto;
    background-color: transparent;
    border: none;
    color: $color-board;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    margin-bottom: auto;

    svg {
      width: 100%;
      height: 100%;
    }

    @media #{$breakpoint-sm} {
      display: none;
    }
  }

  &__container {
    width: 100%;
    position: absolute;
    z-index: 100;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    padding-top: unit(10);
    padding-bottom: unit(10);
    transition: backdrop-filter 0.3s ease-in-out;

    &.on-top {
      backdrop-filter: blur(unit(10));
    }
  }

  &__nav {
    width: 70%;
    display: flex;
    gap: unit(40);
    margin: auto;
    background-color: $color-primary-bg-dark;
    padding-left: unit(30);
    padding-right: unit(30);
    border: {
      style: solid;
      color: $color-board;
      width: unit(2);
      radius: unit(99);
    }

    @media #{$breakpoint-sm} {
      width: auto;
      padding-left: unit(40);
      padding-right: unit(40);
    }

    &__link {
      display: flex;
      align-items: center;
      text-decoration: none;
      width: 100%;
      color: $color-primary-text-light;
      padding: unit(10);

      @media #{$breakpoint-sm} {
        height: 100%;
      }
    }
  }

  &__logo {
    margin: 0;
    background-color: $color-board;

    a {
      color: $color-primary-text-light;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 unit(10);

      .logo {
        width: unit(100);

        @media #{$breakpoint-sm} {
          width: unit(140);
        }
      }
    }
  }

  &__menu {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
    padding: 0;
    margin: 0;
    margin-left: auto;

    position: fixed;
    z-index: 101;
    width: 90%;
    height: 100vh;
    background-color: $color-primary-bg-dark;
    top: unit(-40);
    right: 0;
    padding-top: unit(60);
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;

    &.active {
      transform: translateX(0);
    }

    @media #{$breakpoint-sm} {
      flex-direction: row;
      position: static;
      transform: inherit;
      width: auto;
      height: auto;
      background-color: transparent;
      padding-top: 0;
    }

    &__item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &.close {
        button{
          padding: 0;
          width: unit(40);
          height: unit(40);
        }

        svg {
          width: 100%;
          height: 100%;
        }
        margin-left: auto;
        @media #{$breakpoint-sm} {
          display: none;
        }
      }

      &__link {
        color: $color-primary-text-light;
        text-decoration: none;
      }

      &__button {
        background-color: transparent;
        color: $color-primary-text-light;
        border: none;
        padding: unit(10);
        border-radius: unit(10);
        cursor: pointer;
        margin-right: unit(10);
        transition: transform 0.3s ease-in-out;

        @media #{$breakpoint-sm} {
          display: none;
        }
      }

      &.active {
        .navbar__menu__item__content {
          background-color: $color-board;
        }
        .navbar__menu__item__button {
          transform: rotate(180deg);
        }
      }

      &__content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        transition: background-color 0.3s ease-in-out;
      }

      @media #{$breakpoint-sm} {
        &:hover .navbar__submenu {
          max-height: 100vh;
          opacity: 1;
        }
      }
    }
  }

  &__submenu {
    --size: #{unit(20)};
    --color: #{$color-board};
    position: relative;
    width: calc(100% - unit(80));
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: $color-primary-bg-dark;
    padding: 0;
    border: {
      style: solid;
      color: $color-board;
      width: unit(2);
      radius: unit(10);
    }
    border-top-style: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.35s ease-in-out, opacity 0.7s ease-in-out;

    &::before {
      @include invertedRadius(rotate(180deg));
      top: 0;
      right: 100%;
    }

    &::after {
      @include invertedRadius(rotate(270deg));
      top: 0;
      left: 100%;
    }

    &.active {
      overflow: visible;
      opacity: 1;
      max-height: 100vh;
      transition: max-height 0.35s ease-in-out, opacity 0.2s ease-in-out;
    }

    @media #{$breakpoint-sm} {
      width: auto;
      position: absolute;
      top: 100%;
      right: 0;
    }

    &__item {
      display: flex;
      border-radius: unit(10);
      transition: background-color 0.3s;

      .navbar__nav__link {
        background-color: transparent !important;
        justify-content: flex-end;
        white-space: pre;
        padding: unit(10);
        width: 100%;
        text-align: right;
        color: $color-primary-text-light;
        text-decoration: none;
      }
    }
  }

  &__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color-primary-bg-dark, 0.5);
    z-index: 90;
    display: none;
    backdrop-filter: blur(unit(6));

    &.active {
      display: block;
    }
  }
}
</style>
