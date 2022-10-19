<script setup>
import { RouterView, RouterLink } from "vue-router"
import { useUserStore } from './store/user'
const userStore = useUserStore()
const logOut = async () => {
  await userStore.logOut()
}

</script>

<template>
  <nav>
    <router-link to="/">
      Home
    </router-link>

    <router-link to="login">
      login
    </router-link>

    <router-link to="register">
      Register
    </router-link>
    <button @click="logOut()">
      Logout
    </button>

  </nav>
  <RouterView />
</template>