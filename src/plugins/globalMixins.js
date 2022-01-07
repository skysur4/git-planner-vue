/**
 * You can register global mixins here
 */
import authUtils from "./authentications";
import settings from "./settings";
import github from "./api.github";

const GlobalMixins = {
  install(Vue) {
    Vue.mixin({
      methods: {
        gpFetch: async function(params) {
          const authUtils = this.authUtils;
          return fetch(params.url, {
            method: params.method,
            headers: params.headers,
            body: params.body
          })
            .then(res => {
              if (res.ok) {
                return res.json();
              } else {
                const err = new Error("Response Not Ok");
                err.res = res;
                throw err;
              }
            })
            .then(data => {
              console.log(data);
              if (params.commit) {
                authUtils.commit(params.commit, data);
              }

              if (params.success && params.success instanceof Function) {
                params.success(data);
              } else {
                return data;
              }
            })
            .catch(err => {
              console.log(err);
              if (params.fail && params.fail instanceof Function) {
                params.fail(err);
              } else {
                return null;
              }
            });
        },
        showModal: function(title, content, callback) {
          this.modalInfo = { title: title, content: content };
          if (callback && callback instanceof Function) {
            this.modalOnClose = callback;
          }
          this.isModalOn = true;
        },
        hideModal: function() {
          this.isModalOn = false;
          this.modalInfo = { title: "Title", content: "Content Body" };
          this.modalOnClose();
          this.modalOnClose = function() {};
        },
        modalOnClose: function() {},

        handleResize: function(e) {
          this.wWidth = window.innerWidth;
          this.wHeight = window.innerHeight;
        },

        //authentication
        isAuthenticated: function() {
          let authToken = this.authUtils.getAuthToken();
          if (!authToken) {
            return false;
          } else {
            return true;
          }
        },

        isLogin: function() {
          if (!this.token || !this.user.id) {
            return false;
          } else {
            return true;
          }
        },

        getTree: function() {
          if (this.isLogin()) {
            const getTreeData = {
              url: this.repo.getTreeUrl(this.repo.branchName),
              method: "GET",
              headers: this.github.api.header(this.token)
            };
            return this.gpFetch(getTreeData);
          } else {
            return [];
          }
        }
      },

      data() {
        return {
          //modal
          isModalOn: false,
          modalInfo: { title: "Title", content: "Content Body" },
          //settings
          theme: settings.getTheme(),
          language: settings.getLang(),
          //window resize
          wWidth: window.innerWidth,
          wHeight: window.innerHeight,
          //authentication
          authUtils: authUtils,
          token: authUtils.getAuthToken(),
          user: authUtils.getUserInfo(),
          repo: authUtils.getRepository(),
          //github
          github: github,
          trees: this.getTree()
        };
      },

      computed: {},

      mounted() {
        let { bodyClass } = this.$options;
        if (bodyClass) {
          document.body.classList.add(bodyClass);
        }

        window.addEventListener("resize", this.handleResize);
      },

      beforeDestroy() {
        let { bodyClass } = this.$options;
        if (bodyClass) {
          document.body.classList.remove(bodyClass);
        }

        window.removeEventListener("resize", this.handleResize);
      }
    });
  }
};

export default GlobalMixins;
