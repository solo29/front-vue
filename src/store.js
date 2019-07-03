import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: []
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    }
  },
  actions: {
    getCategories({ commit }, categories) {
      axios.get("https://backendapi.turing.com/departments").then(res => {
        commit("SET_CATEGORIES", res.data);
      });
    }
  }
});
