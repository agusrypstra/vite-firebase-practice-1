<script setup>
import { reactive } from "vue";
import { useUserStore } from "../store/user"
import { message } from "ant-design-vue"

const userStore = useUserStore()

const formState = reactive({
    email: "agusrypstra1@gmail.com",
    password: "yalimar34"
})

const onFinish = async () => {

    const error = await userStore.loginUser(formState.email, formState.password)
    if (!error) {
        return
    }
    switch (error) {
        case "auth/wrong-password": message.error("Invalid pasword")
            break;
        case "auth/user-not-found": message.error("Invalid email")
            break
    }
};
const onFinishFailed = async (error) => {
    console.log(error);
}
</script>

<template>

    <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }" autocomplete="off"
        @finish="onFinish" @finishFailed="onFinishFailed">
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
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Login</a-button>
        </a-form-item>
    </a-form>

</template>