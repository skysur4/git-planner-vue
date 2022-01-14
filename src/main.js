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

//다국어
import VueI18n from "vue-i18n";
import en from "./locales/en";
import ko from "./locales/ko";
import detect from "./locales/detect";
Vue.use(VueI18n);
const lang = detect();
const i18n = new VueI18n({
  locale: lang,
  messages: { en, ko }
});

//시간
import moment from "moment";
import VueMoment from "vue-moment";
require("moment/locale/ko");
moment.locale(lang);
Vue.use(VueMoment, { moment });


import App from "./App.vue";
import MaterialKit from "./plugins/material-kit";

Vue.config.productionTip = false;
Vue.use(MaterialKit);

const NavbarStore = {
  showNavbar: false
};

Vue.mixin({
  data() {
    return {
      NavbarStore
    };
  }
});

import router from "./router";

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
