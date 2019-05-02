/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: webpack config file
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-05-02 14:23:29
 */

module.exports = {
  performance: {
    hints: 'warning',
    maxEntrypointSize: 524288,
    maxAssetSize: 1048576
  },
  module: {
    rules: [
      {
        test: /\.scss$/u,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
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
