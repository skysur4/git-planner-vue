const dataRepo = process.env.VUE_APP_DATA_REPOSITORY;
const githubApiUrl = process.env.VUE_APP_GIT_API_URL;

const github = {
  authentication: "https://github.com/login/oauth/authorize",
  authroization: "/api/github/authorize",
  scope: "read:user repo",
  redirectUrl: "http://gitplanner.io/git-planner/login",
  cId: "f3062111e6c4986874b7",

  api: {
    profile: githubApiUrl + "/user",
    createRepo: githubApiUrl + "/user/repos",
    createRepoParams: {
      name: dataRepo,
      description: "깃플래너용 데이터 리포지토리",
      private: true,
      auto_init: true
    },
    getRepo: function(owner) {
      return githubApiUrl + "/repos/" + owner + "/" + dataRepo;
    },
    getTree: function(owner, branch) {
      return githubApiUrl + "/repos/" + owner + "/" + dataRepo + "/git/trees/" + branch;
    },
    header: token => {
      return {
        Authorization: "token " + token,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json"
      };
    }
  },

  header: function() {
    return {
      "Content-Type": "application/json"
    };
  },
  body: function(data) {
    return JSON.stringify(data);
  }
};

export default github;
