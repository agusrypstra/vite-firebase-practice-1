<script setup>
import { ref } from 'vue';
import router from '../router';
import { useDatabaseStore } from '../store/database'

const databaseStore = useDatabaseStore()
const device = ref({})
const type = ref('')
const description = ref('')
const customer = ref('')

const handleSubmit = () => {
    device.type = type.value,
        device.description = description.value,
        device.customer = customer.value,
        databaseStore.addOrder(device)
    router.push('/')
}

</script>

<template>
    <div>

        <div>
            <h1>Device register</h1>
            <form>
                <input type="text" v-model="type" placeholder="Type">
                <input type="text" placeholder="Describes the failure" v-model="description">
                <input type="text" placeholder="Customer" v-model="customer">
                <button type="submit" @click.prevent="handleSubmit()">Submit</button>
            </form>
        </div>

    </div>
</template>