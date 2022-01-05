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
                  <img
                    :src="this.userInfo.avatar_url"
                    alt="Circle Image"
                    class="img-raised rounded-circle img-fluid"
                  />
                </div>
                <div class="name">
                  <h3 class="title">{{ this.userInfo.name }}</h3>
                  <h6><img alt="GitHub last commit" :src="commitBadge" /></h6>

                  <md-button class="md-simple md-dribbble"
                    ><img alt="GitHub follower" :src="followerBadge"
                  /></md-button>
                  <md-button class="md-simple md-dribbble"
                    ><img alt="GitHub stars" :src="starBadge"
                  /></md-button>

                  <!--a href=""><img src="https://shields.io//github/forks/{{this.userInfo.login}}/:repo?label=Fork" /></a>
				<a href=""><img src="https://shields.io//github/stars/{{this.userInfo.login}}/:repo?style=social" /></a>
				<a href=""><img src="https://shields.io//github/watchers/{{this.userInfo.login}}/:repo?label=Watch" /></a-->
                </div>
              </div>
            </div>
          </div>
          <div class="description text-center">
            <p>{{ this.userInfo.bio }}</p>
          </div>
          <div class="profile-tabs">
            <tabs
              :tab-name="['To-do', 'New', 'Favorite']"
              :tab-icon="['list', 'star', 'favorite']"
              plain
              nav-pills-icons
              color-button="success"
            >
              <!-- here you can add your content for tab-content -->
              <template slot="tab-pane-1">
                <div class="md-layout">
                  <div class="md-layout-item md-size-25 ml-auto">
                    <h6>title</h6>
                    12345 2345234 2345
                    <h6>title</h6>
                    12345 2345234 2345 52345234 5 2345 3245 2345 324 5 3245 32
                    45 3
                    <h6>title</h6>
                    12345 2345234 2345
                    <h6>title</h6>
                    12345 2345234 2345
                  </div>
                  <div class="md-layout-item md-size-25 mr-auto">
                    <h6>title</h6>
                    <a href="">12345 2345234 2345</a>
                    <h6>title</h6>
                    <a href="">12345 2345234 2345</a>
                    <h6>title</h6>
                    <a href=""
                      >12345 2345234 2345 345 32 45 23 4 523 45 23 4 5ojiepr
                      jpfo j3p2o4ij po4ij poi 3j2p4oij</a
                    >
                  </div>
                </div>
              </template>
              <template slot="tab-pane-2">
                <div class="md-layout">
                  <div class="md-layout-item md-size-25 ml-auto">
                    <h6>title</h6>
                    12345 2345234 2345
                    <h6>title</h6>
                    12345 2345234 2345 52345234 5 2345 3245 2345 324 5 3245 32
                    45 3
                    <h6>title</h6>
                    12345 2345234 2345
                    <h6>title</h6>
                    12345 2345234 2345
                  </div>
                  <div class="md-layout-item md-size-25 mr-auto">
                    <h6>title</h6>
                    <a href="">12345 2345234 2345</a>
                    <h6>title</h6>
                    <a href="">12345 2345234 2345</a>
                    <h6>title</h6>
                    <a href=""
                      >12345 2345234 2345 345 32 45 23 4 523 45 23 4 5ojiepr
                      jpfo j3p2o4ij po4ij poi 3j2p4oij</a
                    >
                  </div>
                </div>
              </template>
              <template slot="tab-pane-3">
                <div class="md-layout">
                  <div class="md-layout-item md-size-25 ml-auto">
                    <h6>title</h6>
                    12345 2345234 2345
                    <h6>title</h6>
                    12345 2345234 2345 52345234 5 2345 3245 2345 324 5 3245 32
                    45 3
                    <h6>title</h6>
                    12345 2345234 2345
                    <h6>title</h6>
                    12345 2345234 2345
                  </div>
                  <div class="md-layout-item md-size-25 mr-auto">
                    <h6>title</h6>
                    <a href="">12345 2345234 2345</a>
                    <h6>title</h6>
                    <a href="">12345 2345234 2345</a>
                    <h6>title</h6>
                    <a href=""
                      >12345 2345234 2345 345 32 45 23 4 523 45 23 4 5ojiepr
                      jpfo j3p2o4ij po4ij poi 3j2p4oij</a
                    >
                  </div>
                </div>
              </template>
            </tabs>
          </div>
        </div>
      </div>
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
    followerBadge() {
      return `https://shields.io/github/followers/${this.userInfo.login}?label=Follow&style=social`;
    },
    starBadge() {
      return `https://shields.io/github/stars/${this.userInfo.login}?affiliations=OWNER%2CCOLLABORATOR&style=social`;
    },
    commitBadge() {
      return `https://shields.io/github/last-commit/${this.userInfo.login}/${process.env.VUE_APP_DATA_REPOSITORY}?label=${this.userInfo.login}&style=social&logo=github`;
    }
  },
  methods: {
    getRepository() {
      debugger;
      if (this.isAuthenticated()) {
        const url = this.github.api.getRepo(this.userInfo.login);

        fetch(url, {
          method: "GET",
          headers: this.github.api.header(this.token)
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
            console.log(data);
            this.setRepoInfo(data);
          })
          .catch(err => {
            console.log(err);
            //alert(this.props.t('alert.authentication') + this.props.t('alert.error') + ": [" + err +"]");
            if (confirm("데이터 저장소 조회\n새로 만들까?")) {
              this.createRespository();
            }
          });
      }
    },

    getPlannerData() {
      if (this.isAuthenticated()) {
        const url = this.github.getTree(
          this.userInfo.login,
          this.repoInfo.default_branch
        );

        fetch(url, {
          method: "GET",
          headers: this.github.api.header(this.token)
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
            console.log(data);
            this.setPlannerData(data);
            //default_branch
            //trees_url: "https://api.github.com/repos/skysur4/planner-data/git/trees{/sha}"
          })
          .catch(err => {
            console.log(err);
            //alert(this.props.t('alert.authentication') + this.props.t('alert.error') + ": [" + err +"]");
            alert("데이터 저장소 생성 실패\n나중에 다시 시도");
          });
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
