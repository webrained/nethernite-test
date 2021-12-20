import Vue from "vue";
import Vuex from "vuex";
import ApiService from "@/services/ApiService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    packages: [],
    total: 0,
  },
  mutations: {
    SET_PACKAGES(state, packages) {
      state.packages = packages;
    },
    SET_TOTAL(state, total) {
      state.total = total;
    },
  },
  actions: {
    async searchPackages({ commit }, params) {
      try {
        const res = await ApiService.searchPackages(params);
        commit("SET_PACKAGES", res.data.results);
        commit("SET_TOTAL", res.data.total);
      } catch {
        commit("SET_PACKAGES", []);
        commit("SET_TOTAL", 0);
      }
    },
  },
  modules: {},
});
