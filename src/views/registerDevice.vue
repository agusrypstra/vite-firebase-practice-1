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
        <form class="mt-5">
            <h1>
                Register device
            </h1>
            <div class="mb-3">
                <label class="form-label">Device type</label>
                <select name="select" v-model="type" class="form-select">
                    <option value="notebook">Notebook</option>
                    <option value="desktop">Desktop pc</option>
                    <option value="allInOne">All in one</option>
                </select>
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
</template>