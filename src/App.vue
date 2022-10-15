<script setup>
import {RouterView, RouterLink} from "vue-router"
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
    <button>
      Logout
    </button>
</nav>
  <RouterView />
</template>