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

const authUtils = {
  setAuthState,
  getAuthState,
  setAuthToken,
  getAuthToken,
  createStateCode
};

export default authUtils