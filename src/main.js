import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import lodash from "lodash";
Vue.config.productionTip = false;
Object.defineProperty(Vue.prototype, "_", { value: lodash });
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
