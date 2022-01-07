<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-50 mx-auto">
              <div class="profile">
                <div class="avatar">
                  <a :href="gitLink">
                  <img
                    :src="this.user.avatar"
                    alt="Circle Image"
                    class="img-raised rounded-circle img-fluid"
                  /></a>
                </div>
                <div class="name">
                  <h3 class="title" v-show="this.user.name">{{ this.user.name }}</h3>
                  <h6>&nbsp;{{ this.user.id }}</h6>
                  <md-button class="md-simple md-dribbble" :href="gitLink">
                    <img alt="GitHub Follower" :src="followerBadge" style="margin-right:3px;"/>
                    <img alt="GitHub Stars" :src="starBadge"/>
                  </md-button>
                </div>
              </div>
            </div>
          </div>
          <div class="description text-center">
            <p>{{ this.user.bio }}</p>
          </div>

          <div class="profile-tabs">
            <tabs
              :tab-name="['To-do', 'New', 'Favorite']"
              :tab-icon="['list', 'post_add', 'favorite_border']"
              plain
              flex-column
              nav-pills-icons
              color-button="primary"
            >
              <!-- here you can add your content for tab-content -->
              <template slot="tab-pane-1">
		        <div class="md-layout-item mx-auto">
		          <div v-for="(item, index) in todoList"
		          	   @click="switchPanel(tabName[index])"
		         	   v-bind:key="item.key">
		          	<h6>{{item.title}}</h6>
            		<p>{{item.content}}</p>
		          </div>
			    </div>
              </template>
              <template slot="tab-pane-2">
		        <div class="md-layout-item mx-auto">
		          <div v-for="(item, index) in newList"
		          	   @click="switchPanel(tabName[index])"
		         	   v-bind:key="item.key">
		          	<h6>{{item.title}}</h6>
            		<p>{{item.content}}</p>
		          </div>
			    </div>
              </template>
              <template slot="tab-pane-3">
		        <div class="md-layout-item mx-auto">
		          <div v-for="(item, index) in favoriteList"
		          	   @click="switchPanel(tabName[index])"
		         	   v-bind:key="item.key">
		          	<h6>{{item.title}}</h6>
            		<p>{{item.content}}</p>
		          </div>
			    </div>
              </template>
            </tabs>
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
import { Tabs } from "@/components";

export default {
  components: {
    Tabs
  },
  bodyClass: "profile-page",
  data() {
    return {
      tabPane1: [
        { image: require("@/assets/img/examples/studio-1.jpg") },
        { image: require("@/assets/img/examples/studio-2.jpg") },
        { image: require("@/assets/img/examples/studio-4.jpg") },
        { image: require("@/assets/img/examples/studio-5.jpg") }
      ],
      tabPane2: [
        { image: require("@/assets/img/examples/olu-eletu.jpg") },
        { image: require("@/assets/img/examples/clem-onojeghuo.jpg") },
        { image: require("@/assets/img/examples/cynthia-del-rio.jpg") },
        { image: require("@/assets/img/examples/mariya-georgieva.jpg") },
        { image: require("@/assets/img/examples/clem-onojegaw.jpg") }
      ],
      tabPane3: [
        { image: require("@/assets/img/examples/mariya-georgieva.jpg") },
        { image: require("@/assets/img/examples/studio-3.jpg") },
        { image: require("@/assets/img/examples/clem-onojeghuo.jpg") },
        { image: require("@/assets/img/examples/olu-eletu.jpg") },
        { image: require("@/assets/img/examples/studio-1.jpg") }
      ]
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/pretty-1.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    gitLink() {
      return `https://github.com/${this.user.id}`;
    },
    followerBadge() {
      return `https://shields.io/github/followers/${this.user.id}?label=Follow&style=social`;
    },
    starBadge() {
      return `https://shields.io/github/stars/${this.user.id}?affiliations=OWNER%2CCOLLABORATOR&style=social`;
    },
    todoList() {
	  return [
	  	{key:"1", title:"1111", content:"가나다 alisjdoifj posaid fpoij 2po3i4 poij fdpoi j21poi3j 4oi23 oif oi23j 4oi2j 34oij2 o3ij doi j2oi34j"},
	  	{key:"2", title:"1112", content:"가나다 alisjdoifj posaid fpoij 2po3i4 poij fdpoi j21poi3j 4oi23 oif oi23j 4oi2j 34oij2 o3ij doi j2oi34j"},
	  	{key:"3", title:"1113", content:"가나다 alisjdoifj posaid fpoij 2po3i4 poij fdpoi j21poi3j 4oi23 oif oi23j 4oi2j 34oij2 o3ij doi j2oi34j"},
	  	{key:"4", title:"1114", content:"가나다 alisjdoifj posaid fpoij 2po3i4 poij fdpoi j21poi3j 4oi23 oif oi23j 4oi2j 34oij2 o3ij doi j2oi34j"}
	  ];
	},
    newList() {
	  return [
	  	{key:"1", title:"2111", content:"가나다 alisjdoifj posaid fpoij 2po3i4 poij fdpoi j21poi3j 4oi23 oif oi23j 4oi2j 34oij2 o3ij doi j2oi34j"},
	  	{key:"2", title:"2112", content:"가나다 alisjdoifj posaid fpoij 2po3i4 poij fdpoi j21poi3j 4oi23 oif oi23j 4oi2j 34oij2 o3ij doi j2oi34j"},
	  	{key:"3", title:"213", content:"가나다 alisjdoifj posaid fpoij 2po3i4 poij fdpoi j21poi3j 4oi23 oif oi23j 4oi2j 34oij2 o3ij doi j2oi34j"},
	  	{key:"4", title:"2114", content:"가나다 alisjdoifj posaid fpoij 2po3i4 poij fdpoi j21poi3j 4oi23 oif oi23j 4oi2j 34oij2 o3ij doi j2oi34j"}
	  ];
	},
    favoriteList() {
	  return [
	  	{key:"1", title:"3111", content:"가나다 alisjdoifj posaid fpoij 2po3i4 poij fdpoi j21poi3j 4oi23 oif oi23j 4oi2j 34oij2 o3ij doi j2oi34j"},
	  	{key:"2", title:"3112", content:"가나다 alisjdoifj posaid fpoij 2po3i4 poij fdpoi j21poi3j 4oi23 oif oi23j 4oi2j 34oij2 o3ij doi j2oi34j"},
	  	{key:"3", title:"3113", content:"가나다 alisjdoifj posaid fpoij 2po3i4 poij fdpoi j21poi3j 4oi23 oif oi23j 4oi2j 34oij2 o3ij doi j2oi34j"},
	  	{key:"4", title:"3114", content:"가나다 alisjdoifj posaid fpoij 2po3i4 poij fdpoi j21poi3j 4oi23 oif oi23j 4oi2j 34oij2 o3ij doi j2oi34j"}
	  ];
	}
  },
  methods: {
    getRepository() {
      if (this.isLogin()) {
        // const owner = this.user.id;
        const getRepoData = {
          url: this.github.api.getRepo(this.user.id),
          method: "GET",
          headers: this.github.api.header(this.token),
          success: data => {
            this.showModal("알림", "저장소 로딩", function() {
              //this.trees = this.getTree();
            });
          },
          fail: err => {
            if (confirm("데이터 저장소가 없습니다\n새로 만들까요?")) {
              this.createRespository();
            }
          },
          commit: "repo"
        };
        this.gpFetch(getRepoData);
      }
    },

    createRespository() {
      if (this.isAuthenticated()) {
        fetch(this.github.api.createRepo, {
          method: "POST",
          headers: this.github.api.header(this.token),
          body: this.github.body(this.github.api.createRepoParams)
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              const err = new Error("HTTP error...");
              err.res = res;
              throw err;
            }
          })
          .then(data => {
            alert("데이터 저장소 생성 성공");
            this.getRepository();
          })
          .catch(err => {
            console.log(err);
            //alert(this.props.t('alert.authentication') + this.props.t('alert.error') + ": [" + err +"]");
            alert("데이터 저장소 생성 실패\n나중에 다시 시도");
          });
      }
    }
  },

  mounted() {
    this.getRepository();
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.profile-tabs::v-deep {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
}
</style>
