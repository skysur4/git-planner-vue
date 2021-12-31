<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto">

            <login-card header-color="green">
              <h4 slot="title" class="card-title">Continue with</h4>

              <md-button
                slot="buttons"
                v-on:click="checkLoggedIn()"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-github"></i>
              </md-button>

              <p slot="description" class="description">Any data created in this app including memo, schedule, etc will be saved within your GitHub private repository.</p>
              <!--md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>First Name...</label>
                <md-input v-model="firstname"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email...</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input v-model="password"></md-input>
              </md-field>
              <md-button slot="footer" class="md-simple md-success md-lg">
                Get Started
              </md-button-->
            </login-card>
            <md-button class="md-primary md-round classic-modal" @click="infoModal = true">Classic Modal</md-button>
          </div>
        </div>
      </div>
      <modal v-if="infoModal" @close="infoModalHide">
        <template slot="header">
          <h4 class="modal-title">{{info.title}}</h4>
          <md-button
            class="md-simple md-just-icon md-round modal-default-button"
            @click="infoModalHide"
          >
            <md-icon>clear</md-icon>
          </md-button>
        </template>

        <template slot="body">
          <p>{{info.content}}</p>
        </template>

        <template slot="footer">
          <!--md-button class="md-simple">Nice Button</md-button-->
          <md-button
            class="md-danger md-simple"
            @click="infoModalHide"
            >Close</md-button
          >
        </template>
      </modal>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import { Modal } from "@/components";

import github from "@/var/github";
import authUtils from "@/plugins/authentications";

export default {
	components: {
	  LoginCard,
	  Modal
	},
	bodyClass: "login-page",
	data() {
	  return {
	    firstname: null,
	    email: null,
	    password: null,
	    token: null,
	    userInfo: null,

		infoModal: false,
		info: {
			title: "INFO",
			content: "test"
		}
	  };
	},
	props: {
	  header: {
	    type: String,
	    default: require("@/assets/img/swiss.jpg")
	  }
	},
	computed: {
	  headerStyle() {
	    return {
	      backgroundImage: `url(${this.header})`
	    };
	  },


	},
	mounted() {
		//this.checkLoggedIn();
	},
	methods: {
		checkLoggedIn() {
			this.token = authUtils.getAuthToken();
			if(!this.token){
				const state = authUtils.createStateCode();
				auths.setAuthState(state);

				window.location.replace(github.authentication +
					"?client_id=" + github.cId +
					"&redirect_uri=" + escape(github.redirectUrl) +
					"&scope=" + escape(github.scope) +
					"&state=" + state);
			}else{
				//alert(t('alert.authentication') + t('alert.complete'));
				alert("인증 완료");
				//this.checkDataRespository();
				this.getUserInfo();
			}
		},

		getUserInfo() {
			fetch(github.api.profile,
		  		{
		  			method: "GET",
		  			headers: github.api.header(this.token),
		  		}
		  	).then(res => res.json()
		  	).then(data => {
				console.log(data);
				this.userInfo = data;
		  	}).catch(err => {
		  		//alert(this.props.t('alert.authentication') + this.props.t('alert.error') + ": [" + err +"]");
		  		alert("사용자 정보 조회 실패");
			});
		},

	    infoModalHide() {
	      this.infoModal = false;
	      window.location.href="/git-planner/profile";
	    },
	}

};
</script>

<style lang="css"></style>
