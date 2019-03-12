/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: vue配置文件
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-03-12 11:00:44
 */
/**
 * @description: vue输出配置
 * @property {string} publicPath @default '/' 网站在服务器上的部署位置
 * @property {string} outputDir @default 'dist' 网站在服务器上的部署位置
 * @property {string} assetsDir @default '' 放置生成的静态资源相对于outputDir的目录
 * @property {string} indexPath @default 'index.html' 指定生成的主页文件相对于outputDir的输出路径，也可以是一个绝对路径。
 * @property {string} filenameHashing @default true 文件名hash处理
 * @property {boolean} productionSourceMap @default true 生产环境是否生产SourceMap
 */
module.exports = {
  publicPath: '/',
  outputDir: 'dist', // 编译输出目录
  assetsDir: '',
  indexPath: 'index.html', // 网站主页文件名称
  filenameHashing: true, // 文件名hash处理
  // pages: undefined, // type is Object
  lintOnSave: true, // 是否在保存时提示
  runtimeCompiler: false,
  productionSourceMap: false, // 生产环境是否生产SourceMap
  // crossorigin: undefined,
  configureWebpack: { devtool: 'source-map' },
  devServer: {
    proxy: 'http://nenu.com'
  }
};
