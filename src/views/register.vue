<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user"
const userStore = useUserStore()

const email = ref("")
const password = ref("")

const handleSubmit = async () => {
    if (!email.value || password.value < 6) {
        return alert("Complete los campos")
    } else {
        userStore.registerUser(email.value, password.value)

    }

}
</script>

<template>
    <a-row>
        <a-col span="12" offset="6">
            <form @submit.prevent="handleSubmit(email, password)">
                <input v-model="email" type="email" aria-describedby="emailHelp">
                <input v-model="password" type="password">
                <button type="submit" :disabled="userStore.loadingState">Register</button>
            </form>
        </a-col>
    </a-row>
</template>