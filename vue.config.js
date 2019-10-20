module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/walk/" : "/",
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/style.scss";`
      }
    }
  }
};
