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
    <div class="container d-flex justify-content-center">

        <div class="d-flex flex-column text-center">
            <h1>Device register</h1>
            <form class="mt-5 border border-secondary rounded p-3">
                <div class="mb-3">
                    <input type="text" v-model="type" placeholder="Type" class="form-control">
                </div>
                <div class="mb-3">
                    <input type="text" placeholder="Describes the failure" class="form-control" v-model="description">
                </div>
                <div class="mb-3">
                    <input type="text" placeholder="Customer" class="form-control" v-model="customer">
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-primary" @click.prevent="handleSubmit()">Submit</button>
                </div>
            </form>
        </div>

    </div>
</template>