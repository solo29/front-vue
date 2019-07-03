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
    product: {}
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
    }
  }
});
