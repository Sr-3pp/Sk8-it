<script setup lang="ts">
const authStore = useAuthStore()
const { isAuthenticated, logout, user } = toRefs(authStore)
</script>

<template lang="pug">
.top-bar
  Container
    p(v-if="isAuthenticated") {{ user.name }}
    NuxtLink(to="/panel" v-if="isAuthenticated") panel
    button(@click="logout" v-if="isAuthenticated") logout
    NuxtLink(to="/login" v-else) login
</template>

<style scoped lang="scss">
.top-bar{
  --size: #{unit(20)};
  --color: #{$color-board};
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: center;
  gap: unit(20);
  background-color: $color-board;
  color: $color-primary-text-light;
  border-bottom-right-radius: unit(16);
  border-bottom-left-radius: unit(16);
  height: unit(40);
  width: calc(100% - unit(80));
  margin: auto;

  &::before{
    @include invertedRadius(rotate(180deg));
    top: 0;
    right: 100%;
  }

  &::after{
    @include invertedRadius(rotate(270deg));
    top: 0;
    left: 100%;
  }

  a{
    color: currentColor;
    text-decoration: none;
  }

  .container{
    margin: auto;
    display: flex;
    justify-content: space-between;
  }
}
</style>
