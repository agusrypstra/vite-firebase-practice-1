<script setup>
import { useDatabaseStore } from "../store/database.js"
const databaseStore = useDatabaseStore();
databaseStore.getMyOrders()
</script>

<template>
    <div>
        <div>
            <div v-for="order of databaseStore.myDocuments" :key="order.id">
                <div>
                    <div>
                        <h5>{{ order.type }}</h5>
                        <p>
                            Error: {{ order.description }}
                        </p>
                        <div>
                            <button @click="databaseStore.leaveOrder(order.id)">Leave
                                order</button>
                            <button @click="router.push(`/edit/${order.id}`)">Edit
                                order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>