/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: webpack配置文件
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-03-31 11:22:59
 */

module.exports = {
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

// configureWebpack: { devtool: 'source-map' }
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
