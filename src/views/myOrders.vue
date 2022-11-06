<script setup>
import { useDatabaseStore } from "../store/database.js"
import { useRouter } from "vue-router"
import { reactive } from "vue";

const router = useRouter()
const databaseStore = useDatabaseStore();
databaseStore.getMyOrders()
const formState = reactive({
    diagnostic: ''
})
const finishOrder = async (id) => {
    await databaseStore.finishOrder(id, formState.diagnostic)
}
</script>

<template>
    <a-row>
        <a-card v-for="order of databaseStore.myDocuments" :title="order.type">
            <template #extra>
                <a-space>
                    <a-button @click="databaseStore.leaveOrder(order.id)">Leave
                    </a-button>
                    <a-button @click="router.push(`/edit/${order.id}`)">Edit
                    </a-button>
                </a-space>
            </template>
            <p>
                Error: {{ order.description }}
            </p>
            <a-divider />
            <p>
                Customer: {{ order.customer }}
            </p>
            <a-divider />
            <a-form :model="formState" name="basic" @finish="finishOrder(order.id)">
                <a-form-item name="diagnostic" label="Diagnostic" :rules="[{ required }]">
                    <a-input v-model:value="formState.diagnostic">

                    </a-input>
                </a-form-item>
                <a-form-item name="price" label="Price">
                    <a-input type="number">
                    </a-input>
                </a-form-item>
                <a-button type="primary" html-type="submit">Finalized</a-button>
            </a-form>
        </a-card>
    </a-row>
</template>