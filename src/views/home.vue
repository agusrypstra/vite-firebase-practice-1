<script setup>
    import {useUserStore} from "../store/user"
    const userStore = useUserStore()
</script>

<template>
    <h1>
        This is the home page
    </h1>
    <h3>
        {{userStore.userData}}
    </h3>
</template>