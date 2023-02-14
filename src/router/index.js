import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AppLayout from "@/views/AppLayout.vue";
import AdmAppLayout from "@/views/admin/AppLayout.vue";
import NotFound from "@/components/NotFound.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // linkActiveClass: "active",
  routes: [
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "/home",
          name: "home",
          component: HomeView,
        },
        {
          path: "products",
          name: "UserProducts",
          component: () => import("../views/ProductList.vue"),
        },
        {
          path: "product/:id",
          name: "ProductDetail",
          props: true,
          component: () => import("../views/ProductDetail.vue"),
        },
        {
          path: "cart",
          name: "CartView",
          component: () => import("../views/CartView.vue"),
        },
      ],
    },
    {
      path: "/adm",
      component: AdmAppLayout,
      children: [
        {
          path: "products",
          name: "AdmProducts",
          component: () => import("../views/admin/AdmProducts.vue"),
          meta: {
            auth: true,
          },
        },
        {
          path: "orders",
          name: "AdmOrders",
          component: () => import("../views/admin/AdmOrders.vue"),
          meta: {
            auth: true,
          },
        },
      ],
    },

    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    // last route rule
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
