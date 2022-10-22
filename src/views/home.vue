<script setup>
import { useUserStore } from "../store/user"
import { useDatabaseStore } from "../store/database"
const userStore = useUserStore()
const databaseStore = useDatabaseStore()

</script>

<template>
    <div class="container">
        <h1>
            This is the home page
        </h1>
        <h3>
            Welcome {{userStore.userData?.email}}, this is the orders to repair
        </h3>
        <div class="d-flex justify-content-center" v-if="databaseStore.loadingState">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-sm-6" v-for="order of databaseStore.documents" :key="order.id">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{order.type}}</h5>
                        <p class="card-text">
                            {{order.description}}
                        </p>
                        <p>{{order.id}}</p>
                        <button class="btn btn-outline-primary me-2">Take order</button>
                        <button class="btn btn-outline-danger" @click="databaseStore.deleteOrder(order.id)">Delete
                            order</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>