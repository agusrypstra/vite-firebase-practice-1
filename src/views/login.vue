<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user"
const userStore = useUserStore()

const email = ref('agusrypstra@gmail.com')
const password = ref('123456')
const handleSubmit = async () => {
    if (!email.value || password.value < 6) {
        return alert("Complete the form")
    } else {
        userStore.loginUser(email.value, password.value)
        userStore.currentUser()
    }
}
</script>

<template>
    <div class="container">
        <h1>
            LOGIN PAGE
        </h1>
        <form @submit.prevent="handleSubmit(email,password)">
            <input type="email" placeholder="email" v-model="email" class="mb-3">
            <input type="password" placeholder="password" v-model="password" class="mb-3">
            <button type="submit" :disabled="userStore.loadingState" class="mb-3 btn btn-primary">Login</button>
        </form>
    </div>
</template>