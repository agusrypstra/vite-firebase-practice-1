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
    <div class="container d-flex justify-content-center">
        <form @submit.prevent="handleSubmit(email,password)" class="w-25 mt-5">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input v-model="email" type="email" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <button type="submit" class="btn btn-primary" :disabled="userStore.loadingState">Register</button>
        </form>
    </div>
</template>