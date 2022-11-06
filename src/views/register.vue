<script setup>
import { reactive } from "vue";
import { useUserStore } from "../store/user"
import { message } from "ant-design-vue"
const userStore = useUserStore()

const formState = reactive({
    email: "agusrypstra1@gmail.com",
    password: "yalimar34",
    checkPass: ''
})
const validatePass = async (_rule, value) => {
    if (value === '') {
        return Promise.reject('Please input the password');
    }
    if (value !== formState.password) {
        return Promise.reject('Two inputs dont match!');
    } else {
        return Promise.resolve();
    }
}
const onFinish = async () => {
    if (!formState.email || formState.password < 6) {
        return alert("Complete los campos")
    } else {
        const error = await userStore.registerUser(formState.email, formState.password)
        if (!error) {
            return
        }
        if (error === "auth/email-already-in-use") {
            message.error("This email is already in use")
        }
    }
}
</script>

<template>
    <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }" autocomplete="off"
        @finish="onFinish">
        <a-form-item name="email" label="Email"
            :rules="[{ required: true, type: 'email', message: 'Please input your Email!' }]">
            <a-input v-model:value="formState.email">
            </a-input>
        </a-form-item>
        <a-form-item name="password" label="Password"
            :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-input-password v-model:value="formState.password">
            </a-input-password>
        </a-form-item>
        <a-form-item name="checkPass" label="Confirm" :rules="[{ required: true, validator: validatePass }]">
            <a-input-password v-model:value="formState.checkPass">
            </a-input-password>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Register</a-button>
        </a-form-item>
    </a-form>
</template>