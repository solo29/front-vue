import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
    departments: [],
    selectedTerm: null,
    searchString: null,
    products: [],
    page: 1,
    productPerPage: 6,
    product: {},
    cart_id: null,
    cart: []
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_DEPARTMENTS(state, departments) {
      state.departments = departments;
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    },
    SET_PAGE(state, page) {
      state.page = page;
    },

    SET_SELECTED_TERM(state, term) {
      state.selectedTerm = term;
    },
    SET_SEARCH_STRING(state, term) {
      state.searchString = term;
    },
    SET_CART_ID(state, cart_id) {
      state.cart_id = cart_id;
    },
    SET_CART(state, cart) {
      state.cart = cart;
    }
  },
  actions: {
    getCategories({ commit }) {
      axios.get("https://backendapi.turing.com/categories").then(res => {
        commit("SET_CATEGORIES", res.data);
      });
    },
    getDepartments({ commit }) {
      axios.get("https://backendapi.turing.com/departments").then(res => {
        commit("SET_DEPARTMENTS", res.data);
      });
    },
    searchProducts({ commit, state }, searchString) {
      commit("SET_SEARCH_STRING", searchString);

      let query = searchString ? `search?query_string=${searchString}&all_words=on&` : "?";
      axios.get(`https://backendapi.turing.com/products/${query}page=${state.page}&limit=${state.productPerPage}`).then(res => {
        commit("SET_PRODUCTS", res.data);
      });
    },
    getProducts({ commit, state }, params) {
      let page = state.page;
      let term = "";
      if (state.selectedTerm) {
        Object.keys(state.selectedTerm).map(key => {
          term += key + "/" + state.selectedTerm[key];
        });
      }
      //state.selectedDepartmentId ? "inDepartment/" + state.selectedDepartmentId : "";
      axios.get(`https://backendapi.turing.com/products/${term}?page=${page}&limit=${state.productPerPage}`).then(res => {
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
      dispatch("getProducts");
    },
    changeCategory({ dispatch, commit }, categoryId) {
      commit("SET_PAGE", 1);
      commit("SET_SELECTED_TERM", { inCategory: categoryId });
      dispatch("getProducts");
    },
    changeDepartment({ dispatch, commit }, departmentId) {
      commit("SET_PAGE", 1);
      commit("SET_SELECTED_TERM", { inDepartment: departmentId });
      dispatch("getProducts");
    },
    generateUniqueId({ commit }) {
      let cart_id_local = localStorage.getItem("cart_id");
      if (!_.isEmpty(cart_id_local)) {
        commit("SET_CART_ID", cart_id_local);
      } else {
        axios.get("https://backendapi.turing.com/shoppingcart/generateUniqueId").then(res => {
          commit("SET_CART_ID", res.data.cart_id);
          localStorage.setItem("cart_id", res.data.cart_id);
        });
      }
    },
    addToCart({ dispatch }, params) {
      axios.post("https://backendapi.turing.com/shoppingcart/add", params).then(res => {
        dispatch("getCart");
      });
    },
    getCart({ commit, state }) {
      axios.get("https://backendapi.turing.com/shoppingcart/" + state.cart_id).then(res => {
        commit("SET_CART", res.data);
      });
    },
    updateCart({ dispatch }, params) {
      axios.put("https://backendapi.turing.com/shoppingcart/update/" + params.item_id, { quantity: params.quantity }).then(res => {
        dispatch("getCart");
      });
    },
    removeProduct({ dispatch }, item_id) {
      axios.delete("https://backendapi.turing.com/shoppingcart/removeProduct/" + item_id).then(res => {
        console.log(res);
        dispatch("getCart");
      });
    }
  }
});
