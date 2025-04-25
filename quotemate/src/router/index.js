/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import { routes as autoRoutes } from "vue-router/auto-routes";
import { routes } from "vue-router/auto-routes";
import QuotationHistory from "@/pages/quotation-history.vue";
import { nextTick } from "vue";

// Define additional routes
const additionalRoutes = [
  // ... other routes
  {
    path: "/quotation-history",
    name: "QuotationHistory",
    component: QuotationHistory,
  },
  // ... other routes
];

const combinedRoutes = [...setupLayouts(autoRoutes), ...additionalRoutes];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: combinedRoutes,

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem("accessToken");
  const requiresAuth =
    to.path === "/quotation" || to.path === "/quotation-history";

  if (requiresAuth && !accessToken) {
    next("/user-signup");
  } else {
    next();
  }
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
