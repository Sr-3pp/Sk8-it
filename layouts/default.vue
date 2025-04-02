<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'

const { navigation: navigationData } = useNavigation();
const { data: nav } = await navigationData;

const navigation = nav.value?.filter((item) => item.path !== "/");
</script>

<template>
  <main>
    <Analytics />
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <TopBar />
    <Navbar :navigation="navigation" />
    <NuxtPage />
    <Footer :navigation="navigation" />
  </main>
</template>
