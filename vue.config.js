module.exports = {
  publicPath: process.env.VUE_APP_CONTEXT_PATH,
  devServer: {
    port: 3000,
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      css: {
        sourceMap: process.env.NODE_ENV !== "production" ? true : false
      }
    }
  }
};
