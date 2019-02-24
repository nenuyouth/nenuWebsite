module.exports = {
  module: {
    rules: [
      {
        loader: 'vue-svg-loader',
        test: /\.svg$/u
      }
    ]
  }
};
/*
 * plugins: [
 *   new webpack.ProvidePlugin({
 *     $: "jquery",
 *     jQuery: "jquery",
 *     "window.jQuery": "jquery",
 *     Popper: ["popper.js", "default"]
 *   })
 * ]
 */
