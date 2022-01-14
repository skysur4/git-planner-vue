const setAuthState = state => {
  return window.localStorage.setItem("state", state);
};

const getAuthState = () => {
  const state = window.localStorage.getItem("state");
  return state === undefined ||
    state === null ||
    state === "undefined" ||
    state === "null"
    ? ""
    : state;
};

const setAuthToken = token => {
  return window.localStorage.setItem("token", token);
};

const getAuthToken = () => {
  const token = window.localStorage.getItem("token");
  return token === undefined ||
    token === null ||
    token === "undefined" ||
    token === "null"
    ? ""
    : token;
};

const createStateCode = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

const setUserInfo = payload => {
  window.localStorage.setItem("login", payload.login);
  window.localStorage.setItem("name", payload.name);
  window.localStorage.setItem("bio", payload.bio);
  window.localStorage.setItem("avatar_url", payload.avatar_url);
  return {
    id: payload.login,
    name: payload.name,
    bio: payload.bio,
    avatar: payload.avatar_url
  };
};

const getUserInfo = () => {
  return {
    id: window.localStorage.getItem("login"),
    name: window.localStorage.getItem("name"),
    bio: window.localStorage.getItem("bio"),
    avatar: window.localStorage.getItem("avatar_url")
  };
};

const setRepository = payload => {
  window.localStorage.setItem("default_branch", payload.default_branch);
  window.localStorage.setItem("trees_url", payload.trees_url);
  window.localStorage.setItem("updated_at", payload.updated_at);
  return {
    userId: payload.default_branch,
    userName: payload.trees_url,
    updatedAt: payload.updated_at
  };
};

const getRepository = () => {
  let branch = window.localStorage.getItem("default_branch");
  if (!branch) {
    return {};
  } else {
    let url = window.localStorage.getItem("trees_url");
    return {
      branchName: window.localStorage.getItem("default_branch"),
      treeUrl: url.replace("{/sha}", "/" + branch),
      updatedAt: window.localStorage.getItem("updated_at")
    };
  }
};

const commit = (target, payload) => {
  if (target === "user") {
    setUserInfo(payload);
  }
  if (target === "repo") {
    setRepository(payload);
  }
};

const resetAuth = () => {
  window.localStorage.removeItem("token");
  logout();
};

const logout = () => {
  window.localStorage.getItem("login");
  window.localStorage.getItem("name");
  window.localStorage.getItem("bio");
  window.localStorage.getItem("avatar_url");
  window.localStorage.getItem("default_branch");
  window.localStorage.getItem("trees_url");
};

const authUtils = {
  setAuthState,
  getAuthState,
  setAuthToken,
  getAuthToken,
  createStateCode,
  //사용자 정보
  setUserInfo,
  getUserInfo,
  setRepository,
  getRepository,
  commit,
  logout,
  resetAuth
};

export default authUtils;
