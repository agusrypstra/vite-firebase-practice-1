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
  ],
});

export default router;
