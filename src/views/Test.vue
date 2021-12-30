<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto" v-if="!userInfo">
            <login-card header-color="green">
              <h4 slot="title" class="card-title" v-if="!userInfo">Login</h4>

              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
                v-if="!userInfo"
              >
                <i class="fab fa-github"></i>

              </md-button>

              <md-button slot="footer" class="md-simple md-success md-lg">
                Get Started
              </md-button>
            </login-card>
          </div>
          <div class="md-layout-item md-size-50 mx-auto" v-if="userInfo">
            <div class="profile">
              <div class="avatar">
                <img
                  :src="userInfo.avatar_url"
                  alt="Circle Image"
                  class="img-raised rounded-circle img-fluid"
                />
              </div>
              <div class="name">
                <h3 class="title">{{userInfo.name}}</h3>
                <h6>{{userInfo.login}}</h6>
                <md-button
                  href="javascript:void(0)"
                  class="md-just-icon md-simple md-dribbble"
                  ><i class="fab fa-dribbble"></i
                ></md-button>
                <md-button
                  href="javascript:void(0)"
                  class="md-just-icon md-simple md-twitter"
                  ><i class="fab fa-twitter"></i
                ></md-button>
                <md-button
                  href="javascript:void(0)"
                  class="md-just-icon md-simple md-pinterest"
                  ><i class="fab fa-pinterest"></i
                ></md-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import github from "@/var/github";
import authUtils from "@/plugins/authentications";

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
	    token: null,
	    userInfo: null
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
		this.checkLoggedIn();
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
		}
	}

};
</script>

<style lang="css"></style>
