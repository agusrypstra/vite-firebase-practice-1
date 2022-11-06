<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import router from '../router';
import { useDatabaseStore } from '../store/database'
const databaseStore = useDatabaseStore()
const route = useRoute()

const order = ref({})


const handleSubmit = () => {
    databaseStore.updateOrder(route.params.id, order)
    router.push('/myOrders')
}
onMounted(async () => {
    order.value = await databaseStore.readOrder(route.params.id)

})

</script>

<template>
    <div>
        <h5>Edit order</h5>
        <h6>Type</h6>
        <input type="text" v-model="order.type">
        <h6>Description</h6>
        <input type="text" v-model="order.description">
    </div>
    <button @click="handleSubmit()">
        Update
    </button>
</template>
