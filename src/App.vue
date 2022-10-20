<script setup>
import { RouterView, RouterLink } from "vue-router"
import { useUserStore } from './store/user'
const userStore = useUserStore()
const logOut = async () => {
  await userStore.logOut()
}

</script>

<template>
  <div class="container" v-if="!userStore.loadingState">
    <ul class="nav" v-if="!userStore.loadingSession">
      <li class="nav-item">
        <router-link to="/" class="nav-link" v-if="userStore.userData">
          Home
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="login" class="nav-link" v-if="!userStore.userData">
          login
        </router-link>
      </li>
      <li class="nav-item" v-if="!userStore.userData">
        <router-link to="register" class="nav-link">
          Register
        </router-link>
      </li>
      <li class="nav-item" v-if="userStore.userData">
        <button @click="logOut()" class="btn btn-outline-danger">
          Logout
        </button>
      </li>
    </ul>
    <RouterView />
  </div>
  <div class="container" v-else>
    <h1>
      Loading...
    </h1>
  </div>
</template>