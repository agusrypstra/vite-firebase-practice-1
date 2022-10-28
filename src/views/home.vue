<script setup>
import { useUserStore } from "../store/user"
import { useDatabaseStore } from "../store/database"
import { useRouter } from "vue-router";
const userStore = useUserStore()
const databaseStore = useDatabaseStore()
const router = useRouter()

databaseStore.getOrders()


</script>

<template>
    <div class="container">
        <h1>
            This is the home page
        </h1>
        <h3>
            Welcome {{ userStore.userData?.email }}, this is the orders to repair
        </h3>
        <div class="d-flex justify-content-center" v-if="databaseStore.loadingState">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-sm-6" v-for="order of databaseStore.documents" :key="order.id">
                <div class="card border border-success p-2 mb-2 border-opacity-50">
                    <div class="card-body">
                        <h5 class="card-title">{{ order.type }}</h5>
                        <div class="d-flex justify-content-between">
                            <p class="card-text">
                                {{ order.description }}
                            </p>
                            <p class="card-text">
                                {{ order.customer }}
                            </p>
                        </div>
                        <p v-if="order.tech">{{ order.tech }} it's working on the device</p>
                        <button class="btn btn-outline-primary m-2" @click.prevent="databaseStore.takeOrder(order.id)"
                            :disabled="order.tech">Take
                            order</button>
                        <button class="btn btn-outline-danger m-2"
                            @click.prevent="databaseStore.deleteOrder(order.id)">Delete
                            order</button>
                        <button class="btn btn-outline-secondary m-2" @click="router.push(`/edit/${order.id}`)">Edit
                            order</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>