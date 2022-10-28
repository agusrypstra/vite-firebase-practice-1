<script setup>
import { useDatabaseStore } from "../store/database.js"
const databaseStore = useDatabaseStore();
databaseStore.getMyOrders()
</script>

<template>
    <div class="row">
        <div class="col-sm-6" v-for="order of databaseStore.myDocuments" :key="order.id">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ order.type }}</h5>
                    <input type="text" placeholder="description">
                    <div class="d-grid gap-2 d-md-block mt-2">
                        <button class="btn btn-outline-warning" @click="databaseStore.leaveOrder(order.id)">Leave
                            order</button>
                        <button class="btn btn-outline-danger"
                            @click.prevent="databaseStore.deleteOrder(order.id)">Delete
                            order</button>
                        <button class="btn btn-outline-secondary" @click="router.push(`/edit/${order.id}`)">Edit
                            order</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>