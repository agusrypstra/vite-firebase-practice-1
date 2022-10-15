<script setup>
import {useUserStore} from "../store/user"
const userStore = useUserStore()
</script>

<template>
    <h1>
        This is a register page
    </h1>
    <button
    @click="userStore.registerUser('agutin')">
        Ingresar
    </button>
</template>