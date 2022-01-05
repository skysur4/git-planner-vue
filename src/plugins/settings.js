const setTheme = theme => {
  return window.localStorage.setItem("theme", theme);
};

const getTheme = () => {
  const theme = window.localStorage.getItem("theme");
  return theme === undefined ||
    theme === null ||
    theme === "undefined" ||
    theme === "null"
    ? "default"
    : theme;
};

const setLang = lang => {
  return window.localStorage.setItem("lang", lang);
};

const getLang = () => {
  const lang = window.localStorage.getItem("lang");
  return lang === undefined ||
    lang === null ||
    lang === "undefined" ||
    lang === "null"
    ? "ko"
    : lang;
};

const settings = {
  setTheme,
  getTheme,
  setLang,
  getLang
};

export default settings;
