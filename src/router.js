import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "./store/user";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  const user = await userStore.currentUser();
  if (user) {
    next();
  } else {
    next("/login");
  }
};

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "disabled",
  routes: [
    {
      path: "/",
      name: "home",
      beforeEnter: requireAuth,
      component: () => import("../src/views/home.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../src/views/login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../src/views/register.vue"),
    },
    {
      path: "/registerDevice",
      name: "registerDevice",
      component: () => import("../src/views/registerDevice.vue"),
      beforeEnter: requireAuth,
    },
    {
      path: "/edit/:id",
      name: "edit",
      beforeEnter: requireAuth,
      component: () => import("../src/views/edit.vue"),
    },
    {
      path: "/myorders",
      name: "myOrders",
      beforeEnter: requireAuth,
      component: () => import("../src/views/myOrders.vue"),
    },
    {
      path: "/record",
      name: "record",
      beforeEnter: requireAuth,
      component: () => import("../src/views/record.vue"),
    },
  ],
});

export default router;
