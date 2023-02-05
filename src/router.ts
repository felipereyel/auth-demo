import { createRouter, createWebHistory } from "vue-router";
import { login, getUser } from "./services/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./views/Home.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/profile",
      component: () => import("./views/Profile.vue"),
      meta: { requiresAuth: true },
    },
    { path: "/signed-in", component: () => import("./views/SignedIn.vue") },
    { path: "/signed-out", component: () => import("./views/SignedOut.vue") },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("./views/NotFound.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  const user = await getUser();
  if (to.meta.requiresAuth && !user) {
    await login();
  }
});

export default router;
