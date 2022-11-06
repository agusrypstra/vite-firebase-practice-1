<script setup>
import { auth } from "./firebaseConfig"
import { watch, ref } from "vue";
import { RouterView, RouterLink, useRoute } from "vue-router"
import { useUserStore } from './store/user'
import { useDatabaseStore } from './store/database'

const databaseStore = useDatabaseStore()
const route = useRoute()
const userStore = useUserStore()

const selectedKeys = ref([])
databaseStore.getOrders()

watch(() => route.name, () => { selectedKeys.value = [route.name] })


const logOut = async () => {
  await userStore.logOut()
}


</script>

<template>
  <a-layout class="layout">
    <a-layout-header mode="horizontal">
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item v-if="userStore.userData" key="home">
          <router-link to="/">
            Orders
          </router-link>
        </a-menu-item>
        <a-menu-item v-if="userStore.userData" key="myorders">
          <router-link to="/myOrders">
            My Orders
          </router-link>
        </a-menu-item>
        <a-menu-item v-if="userStore.userData" key="registerdevice">
          <router-link to="registerDevice">
            Enter device
          </router-link>
        </a-menu-item>
        <a-menu-item v-if="userStore.userData" key="record">
          <router-link to="record">
            Record
          </router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="login">
          <router-link to="login">
            login
          </router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="register">
          <router-link to="register">
            Register
          </router-link>
        </a-menu-item>
        <a-menu-item v-if="userStore.userData" @click="logOut()">
          <a-button>
            Logout
          </a-button>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <RouterView />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Designed by Agustin rypstra ©2022
    </a-layout-footer>
  </a-layout>
</template>