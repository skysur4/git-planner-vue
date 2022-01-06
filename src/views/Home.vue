<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Continue with</h4>

              <md-button
                slot="buttons"
                v-on:click="checkLoggedIn()"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-github"></i>
              </md-button>

              <p slot="description" class="description">
                Any data created in this app including memo, schedule, etc will
                be saved within your GitHub private repository.
              </p>
            </login-card>
          </div>
        </div>
      </div>
      <modal v-if="isModalOn" @close="this.hideModal">
        <template slot="header">
          <h4 class="modal-title">{{ this.modalInfo.title }}</h4>
          <md-button
            class="md-simple md-just-icon md-round modal-default-button"
            @click="this.hideModal"
          >
            <md-icon>clear</md-icon>
          </md-button>
        </template>

        <template slot="body">
          <p>{{ this.modalInfo.content }}</p>
        </template>

        <template slot="footer">
          <!--md-button class="md-simple">Nice Button</md-button-->
          <md-button class="md-danger md-simple" @click="this.hideModal">
            Close
          </md-button>
        </template>
      </modal>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";

export default {
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      firstname: null,
      email: null,
      password: null,

      isModalOn: false
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/login.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
        height: `${this.wHeight}px`
      };
    }
  },
  mounted() {
    this.isRedirected();
  },
  methods: {
    isRedirected() {
      const code = this.$route.query.code;
      const state = this.$route.query.state;

      if (code && state) {
        var sentStatus = this.authUtils.getAuthState();
        if (sentStatus == state) {
          const params = {
            url: this.github.authroization,
            method: "POST",
            headers: this.github.header(),
            body: this.github.body({ code: code }),
            success: data => {
              this.authUtils.setAuthToken(data.access_token);
              this.moveTo();
            },
            fail: err => {
              alert(err);
            }
          };
          this.gpFetch(params);
        } else {
          this.showModal("알림", "잘못된 접근입니다", this.moveTo);
        }
      }

      const error = this.$route.query.error;
      if (error) {
        if (error === "redirect_uri_mismatch") {
          //alert(t('alert.authentication') + t('alert.error') + ": [" + params.error_description + "]");
          this.showModal(
            "알림",
            "허가되지 않은 앱을 사용중입니다",
            this.$router.push("/")
          );
        } else {
          //alert(t('alert.access') + t('alert.error'));
          this.showModal("알림", "잘못된 접근입니다", this.$router.push("/"));
        }
      }
    },

    checkLoggedIn() {
      if (this.isAuthenticated()) {
        this.getUserInfo();
      } else {
        const state = this.authUtils.createStateCode();
        this.authUtils.setAuthState(state);

        window.location.replace(
          this.github.authentication +
            "?client_id=" +
            this.github.cId +
            "&redirect_uri=" +
            escape(this.github.redirectUrl) +
            "&scope=" +
            escape(this.github.scope) +
            "&state=" +
            state
        );
      }
    },

    getUserInfo() {
      if (this.isAuthenticated()) {
        const getUserData = {
          url: this.github.api.profile,
          method: "GET",
          headers: this.github.api.header(this.token),
          success: data => {
            this.showModal("알림", "인증이 완료되었습니다", function() {
              this.$router.push("profile");
            });
          },
          fail: err => {
            this.showModal("알림", err.message);
            this.authUtils.resetToken();
          },
          commit: "setUserInfo"
        };
        this.gpFetch(getUserData);
      }
    }
  }
};
</script>

<style lang="css"></style>
