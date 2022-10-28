<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useDatabaseStore } from '../store/database'
const databaseStore = useDatabaseStore()
const route = useRoute()

const order = ref({})


const handleSubmit = () => {
    databaseStore.updateOrder(route.params.id, order)
}
onMounted(async () => {
    order.value = await databaseStore.readOrder(route.params.id)
})

</script>

<template>
    <div class="container d-flex justify-content-center">
        <div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Edit order</h5>
                    <h6>Type</h6>
                    <input type="text" v-model="order.type">
                    <h6>Description</h6>
                    <input type="text" v-model="order.description">
                </div>
                <button @click="handleSubmit()">
                    Update
                </button>
            </div>
        </div>
    </div>
</template>
