import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/detail:pid",
    name: "Detail",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/pay",
    name: "Pay",
    component: () => import("../views/Pay.vue"),
  },
  {
    path: "/morder",
    name: "Morder",
    component: () => import("../views/Morder.vue"),
  },
  {
    path: "/newAddress",
    name: "NewAddress",
    component: () => import("../views/NewAddress.vue"),
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/Main.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/my",
        name: "My",
        component: () => import("../views/My.vue"),
      },
      {
        path: "/order",
        name: "Order",
        component: () => import("../views/Order.vue"),
      },
      {
        path: "/shopbag",
        name: "Shopbag",
        component: () => import("../views/Shopbag.vue"),
      },
    ],
  },
  {
    path: "/",
    redirect: {
      name: "Home",
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
