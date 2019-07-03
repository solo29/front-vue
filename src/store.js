import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
    products: [],
    page: 1,
    productPerPage: 6,
    product: {}
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    },
    SET_PAGE(state, page) {
      state.page = page;
    }
  },
  actions: {
    getCategories({ commit }) {
      axios.get("https://backendapi.turing.com/departments").then(res => {
        commit("SET_CATEGORIES", res.data);
      });
    },
    getProducts({ commit, state }, page = 1) {
      axios.get(`https://backendapi.turing.com/products?page=${page}&limit=${state.productPerPage}`).then(res => {
        commit("SET_PRODUCTS", res.data);
      });
    },
    getProduct({ commit }, id) {
      axios.get("https://backendapi.turing.com/products/" + id).then(res => {
        commit("SET_PRODUCT", res.data);
      });
    },
    changePage({ dispatch, commit }, page) {
      commit("SET_PAGE", page);
      dispatch("getProducts", page);
    }
  }
});
