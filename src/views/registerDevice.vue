<script setup>
import { async } from '@firebase/util';
import { reactive } from 'vue';
import { useDatabaseStore } from '../store/database'
const databaseStore = useDatabaseStore()

const formState = reactive({
    type: "",
    failure: "",
    customer: "",
    accesories: []
})
const onFinish = async () => {
    const res = await databaseStore.addOrder(formState)
    console.log(res);
}

</script>

<template>
    <a-form :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" @finish="onFinish">
        <a-form-item name="type" label="Type" :rules="[{ required: true }]">
            <a-input v-model:value="formState.type">
            </a-input>
        </a-form-item>
        <a-form-item name="failure" label="Failure" :rules="[{ required: true }]">
            <a-input v-model:value="formState.failure">
            </a-input>
        </a-form-item>
        <a-form-item name="customer" label="Customer" :rules="[{ required: true }]">
            <a-input v-model:value="formState.customer">
            </a-input>
        </a-form-item>
        <a-form-item label="Accesories">
            <a-checkbox-group v-model:value="formState.accesories">
                <a-checkbox value="Charger" name="accesory">Charger</a-checkbox>
                <a-checkbox value="Mouse" name="accesory">Mouse</a-checkbox>
                <a-checkbox value="Bag" name="accesory">Bag</a-checkbox>
            </a-checkbox-group>
        </a-form-item>
        <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form>
</template>