import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
    products: []
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    }
  },
  actions: {
    getCategories({ commit }) {
      axios.get("https://backendapi.turing.com/departments").then(res => {
        commit("SET_CATEGORIES", res.data);
      });
    },
    getProducts({ commit }) {
      axios.get("https://backendapi.turing.com/products").then(res => {
        commit("SET_PRODUCTS", res.data);
      });
    }
  }
});
