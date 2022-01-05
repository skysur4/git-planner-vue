// =========================================================
// * Vue Material Kit - v1.2.2
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-kit
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-kit/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue";
import Vuex from 'vuex'
import App from "./App.vue";
import router from "./router";
//import store from "@store";

import MaterialKit from "./plugins/material-kit";

Vue.config.productionTip = false;

Vue.use(MaterialKit);

const NavbarStore = {
  showNavbar: false,
  testData: "123"
};

Vue.mixin({
  data() {
    return {
      NavbarStore
    };
  }
});

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    token: "",
    userInfo: {},
    repoInfo: {},
    plannerData: {}
  },
  getters: {
    getUserInfo: state => {
      return state.userInfo;
    }
  },
  mutations: {
    setUserInfo: state => userInfo => {
      state.userInfo = userInfo;
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
