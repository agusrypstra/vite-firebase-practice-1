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
    <header>
        <div>
            <h1>
                Orders
            </h1>
        </div>
    </header>

    <a-row>
        <a-card v-for="order of databaseStore.documents" :key="order.id">
            <h3>{{ order.type }}</h3>
            <h5>
                Failure
            </h5>
            <p>{{ order.description }}</p>
            <h5>Accesories</h5>
            <ul v-if="order.accesories.length > 0">
                <li v-for="acc of order.accesories">
                    {{ acc }}
                </li>
            </ul>
            <p v-else>
                None
            </p>
            <p>
                Customer: {{ order.customer }}
            </p>
            <a-button @click.prevent="databaseStore.takeOrder(order.id)" :disabled="order.tech">Take
                order</a-button>
            <a-button @click.prevent="databaseStore.deleteOrder(order.id)" v-if="!order.tech">Delete
                order</a-button>
            <a-button @click="router.push(`/edit/${order.id}`)">Edit
                order</a-button>
            <p v-if="order.tech">{{ order.tech }} it's working on the device</p>
        </a-card>

    </a-row>
</template>