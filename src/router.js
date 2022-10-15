import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/',
            name:'home',
            component: () => import('../src/views/home.vue')
        },
        {
            path:'/login',
            name:'login',
            component: () => import('../src/views/login.vue') 
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../src/views/register.vue')
        }
    ],
})

export default router;