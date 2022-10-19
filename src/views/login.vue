<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"
import { useUserStore } from "../store/user"
const userStore = useUserStore()
const router = useRouter()

const email = ref('agusrypstra@gmail.com')
const password = ref('123456')
const handleSubmit = async () => {
    if (!email.value || password.value < 6) {
        return alert("Complete the form")
    } else {
        userStore.loginUser(email.value, password.value)
    }
}
</script>

<template>
    <h1>
        LOGIN PAGE
    </h1>
    <form @submit.prevent="handleSubmit(email,password)">
        <input type="email" placeholder="email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <button type="submit" :disabled="userStore.loadingState">Login</button>
    </form>
</template>