import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    userInfo: undefined,
    defaultBranch: undefined,
    tree: undefined
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
    getDefaultBranch(state) {
      return state.defaultBranch;
    },
    getTree(state) {
      return state.tree;
    }
  },
  // getters: {
  //   getUserInfo(state) {
  //     return state.userInfo;
  //   }
  // },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = Object.assign({}, payload);
    },
    setDefaultBranch(state, payload) {
      state.defaultBranch = payload.default_branch;
    },
    setTree(state, payload) {
      state.tree = Object.assign({}, payload);
    }
  },
  actions: {
    setUserInfo(context, payload) {
      return context.commit("setUserInfo", payload);
    },
    setDefaultBranch(state, payload) {
      return context.commit("setDefaultBranch", payload);
    },
    setTree(state, payload) {
      return context.commit("setTree", payload);
    }
  }
});
