import Vue from "vue";
import Vuex from "vuex";
import ApiService from "@/services/ApiService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    packages: []
  },
  mutations: {
    SET_PACKAGES(state, packages) {
      state.packages = packages
  }
  },
  actions: {
    async searchPackages({ commit }, params) {
      try {
        const res = await ApiService.searchPackages(params);
        commit('SET_PACKAGES', res.data.results)
      } catch {
        commit('SET_PACKAGES', [])
      }
    }
  },
  modules: {},
});
