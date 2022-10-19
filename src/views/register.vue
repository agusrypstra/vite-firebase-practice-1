<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user"
const userStore = useUserStore()

const email = ref("agusrypstra@jaja.com")
const password = ref("asdasdasd")

const handleSubmit = async () => {
    if (!email.value || password.value < 6) {
        return alert("Complete los campos")
    } else {
        userStore.registerUser(email.value, password.value)

    }

}
</script>

<template>
    <h1>
        This is a register page
    </h1>
    <form @submit.prevent="handleSubmit(email,password)">
        <input type="email" placeholder="e-mail" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <button type="submit" :disabled="userStore.loadingState">Login</button>
    </form>
</template>