<template>
  <div>
    <NuxtRouteAnnouncer />
    <Container :with-padding="true">
      <Logo />
      <h1>
        Sitio en construcción
      </h1>
    </Container>
  </div>
</template>

<style lang="scss">
.container{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1{
  text-align: center;
}
</style>
