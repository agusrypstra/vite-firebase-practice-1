<script setup>
import { useUserStore } from "../store/user"
import { useDatabaseStore } from "../store/database"
import { useRouter } from "vue-router";
import { auth } from "../firebaseConfig";
const userStore = useUserStore()
const databaseStore = useDatabaseStore()
const router = useRouter()

databaseStore.getOrders()


</script>

<template>
    <h1>
        This is the home page
    </h1>
    <h3>
        Welcome {{ userStore.userData?.email }}, this is the orders to repair
    </h3>

    <div v-for="order of databaseStore.documents" :key="order.id">

        <h5>{{ order.type }}</h5>

        <p>
            {{ order.description }}
        </p>
        <p>
            {{ order.customer }}
        </p>

        <p v-if="order.tech">{{ order.tech }} it's working on the device</p>
        <button @click.prevent="databaseStore.takeOrder(order.id)" :disabled="order.tech">Take
            order</button>
        <button @click.prevent="databaseStore.deleteOrder(order.id)" v-if="!order.tech">Delete
            order</button>
        <button @click="router.push(`/edit/${order.id}`)">Edit
            order</button>
    </div>
</template>