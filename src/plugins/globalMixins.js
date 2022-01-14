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
        ajax: async function(params) {
          const authUtils = this.authUtils;
          let response = await fetch(params.url, {
            method: params.method,
            headers: params.headers,
            body: params.body
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          let data = await response.json();
          console.log(data);
          if (params.commit) {
            authUtils.commit(params.commit, data);
          }

          if (params.success && params.success instanceof Function) {
            params.success(data);
          }
          return data;
        },
        gpFetch: async function(params) {
          const authUtils = this.authUtils;
          const ajax = await fetch(params.url, {
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
              }
              return data;
            })
            .catch(err => {
              console.log(err);
              if (params.fail && params.fail instanceof Function) {
                params.fail(err);
              } else {
                return null;
              }
            });
          return ajax;
        },
        showModal: function(title, content, callbackDefault, callbackNo) {
          if ("confirm" === title.toLowerCase()) this.isConfirmModal = true;

          this.modalInfo = { title: title, content: content };
          if (callbackDefault && callbackDefault instanceof Function) {
            this.modalOnClose = callbackDefault;
          }

          if (callbackYes && callbackYes instanceof Function) {
            this.confirmYes = callbackYes;
          }

          this.isModalOn = true;
        },
        hideModal: function(answer) {
          this.isModalOn = false;
          this.isConfirmModal = false;

          this.modalInfo = { title: "Title", content: "Content Body" };
          if (answer === true) {
            this.confirmYes();
          } else {
            this.modalOnClose();
          }

          this.modalOnClose = function() {};
          this.confirmYes = function() {};
        },
        modalOnClose: function() {},
        confirmYes: function() {},

        //authentication
        isAuthenticated: function() {
          let authToken = this.authUtils.getAuthToken();
          if (!authToken) {
            return false;
          } else {
            return true;
          }
        },

        decode: function(body, isHtml = false) {
          let decoded = decodeURIComponent(escape(window.atob(body)));

          if (isHtml) {
            return decoded.replace(/\n/gm, "<br/>");
          }

          return decoded;
        },

        isLogin: function() {
          if (!this.token || !this.user.id) {
            return false;
          } else {
            return true;
          }
        },

        isRepositoryFound: function() {
          if (!this.repo || !this.repo.treeUrl) {
            return false;
          } else {
            return true;
          }
        },

        loadTreeData: async function() {
          const loadTree = {
            url: this.repo.treeUrl,
            method: "GET",
            headers: this.github.api.header(this.token),
            success: data => {
              this.treeData = data;
            },
            fail: err => {
              this.showModal("알림", "트리 조회 실패: " + err.message);
            }
          };

          return this.ajax(loadTree);
        },

        loadContentData: async function(blobUrl) {
          const loadContent = {
            url: blobUrl,
            method: "GET",
            headers: this.github.api.header(this.token),
            success: data => {
              this.showModal("알림", this.decode(data.content, true));
            },
            fail: err => {
              this.showModal("알림", "조회 실패: " + err.message);
            }
          };

          return this.ajax(loadContent);
        },

        /**
		params : {
			owner:LOGIN,
			ext:EXTENSION,
			filename:FILENAME (nullable)
			sort: "", "updated" (default:''-> best match)
			order: "asc" (default:asc, desc)
			per_page: 10 (defualt: 30)
			page: 1 (default: 1)
		}
		*/
        searchFiles: async function(params) {
          const searchFiles = {
            url: this.github.api.search(params),
            method: "GET",
            headers: this.github.api.header(this.token)
          };
          return this.ajax(searchFiles);
        }
      },

      data() {
        return {
          //modal
          isModalOn: false,
          isConfirmModal: false,
          modalInfo: { title: "Title", content: "Content Body" },
          //settings
          theme: settings.getTheme(),
          language: settings.getLang(),
          //authentication
          authUtils: authUtils,
          token: authUtils.getAuthToken(),
          user: authUtils.getUserInfo(),
          repo: authUtils.getRepository(),
          //github
          github: github,
          treeData: {}
        };
      },

      computed: {},

      mounted() {
        let { bodyClass } = this.$options;
        if (bodyClass) {
          document.body.classList.add(bodyClass);
        }
      },

      beforeDestroy() {
        let { bodyClass } = this.$options;
        if (bodyClass) {
          document.body.classList.remove(bodyClass);
        }
      }
    });
  }
};

export default GlobalMixins;
