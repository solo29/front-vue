import Vue from "vue";
import Router from "vue-router";

import Products from "./views/Products.vue";
import Customer from "./views/Customer.vue";
import Checkout from "./views/Checkout.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout
    },
    {
      path: "/",
      name: "products",
      component: Products
    },
    {
      path: "/customer",
      name: "customer",
      component: Customer
    },
    {
      path: "/product/:id",
      name: "product",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/Product.vue")
    },
    {
      path: "/order/:id",
      name: "order",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/Order.vue")
    }
  ]
});
