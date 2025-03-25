<script setup lang="ts">
const { login } = useAuthStore()
const email = ref('')
const password = ref('')

const validateMail = () => {
  const mail = email.value
  const mailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return mailPattern.test(mail)
}

const handleLogin = () => {
  if (!validateMail() || !password.value) return
  try {
    login({ email: email.value, password: password.value })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="handleLogin">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="email" />

      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped></style>
