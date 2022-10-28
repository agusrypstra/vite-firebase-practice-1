<script setup>
import { RouterView, RouterLink } from "vue-router"
import { useUserStore } from './store/user'
const userStore = useUserStore()
const logOut = async () => {
  await userStore.logOut()
}


</script>

<template>
  <div v-if="!userStore.loadingState">
    <ul class="border nav d-flex justify-content-between p-2 b-solid" v-if="!userStore.loadingSession">
      <div class="d-flex">
        <li class="nav-item">
          <router-link to="/" class="nav-link" v-if="userStore.userData">
            Orders
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/myOrders" class="nav-link" v-if="userStore.userData">
            My Orders
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="registerDevice" v-if="userStore.userData">
            Enter device
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
      </div>
      <div class="d-flex align-items-center" v-if="userStore.userData">
        <li class="nav-item me-2">
          User: {{ userStore.userData.email }}
        </li>
        <li class="nav-item">
          <button @click="logOut()" class="btn btn-outline-danger">
            Logout
          </button>
        </li>
      </div>
    </ul>
    <RouterView />
  </div>
</template>