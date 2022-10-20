<script setup>
import { useUserStore } from "../store/user"
const userStore = useUserStore()
</script>

<template>
    <div class="container">
        <h1>
            This is the home page
        </h1>
        <h3>
            Bienvenido {{userStore.userData?.email}}
        </h3>
    </div>
</template>