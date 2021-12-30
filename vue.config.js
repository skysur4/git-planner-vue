module.exports = {
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
