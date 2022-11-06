<script setup>
import { useDatabaseStore } from "../store/database"
const databaseStore = useDatabaseStore()

</script>
<template>
    <a-row v-for="order of databaseStore.documents">
        <a-card>
            <h1>
                {{ order.type }}
            </h1>
            <h5>{{ order.diagnostic }}</h5>
            <h5 v-if="order.finished">
                Finalized by: {{ order.tech }}
            </h5>
            <h5 v-else>
                On course of {{ order.tech }}
            </h5>
        </a-card>
    </a-row>
</template>