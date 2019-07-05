import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import lodash from "lodash";
window.axios = require("axios");
import VueStripeCheckout from "vue-stripe-checkout";

Vue.use(VueStripeCheckout, "pk_test_NcwpaplBCuTL6I0THD44heRe");
window.axios.defaults.headers.common["user-key"] = localStorage.getItem("accessToken");

Vue.config.productionTip = false;
Object.defineProperty(Vue.prototype, "_", { value: lodash });
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
