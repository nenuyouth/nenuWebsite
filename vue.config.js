/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: vue config file
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-05-01 15:01:33
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
  chainWebpack: config => { // 处理SVG模块
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  },
  configureWebpack: { devtool: 'source-map' },
  // 开发服务器配置
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/Res': {
        target: 'http://nenu.com',
        secure: false,
        changeOrigin: true
      },
      '/server': {
        target: 'http://nenu.com',
        secure: false,
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {// 向 CSS 相关的 loader 传递选项
      less: {
        // 自定义antd主题
        modifyVars: {
          'primary-color': '#3cba63',
          'link-color': '#3cba63'
        },
        javascriptEnabled: true
      }
    }
  },
  // Progressive App Surpport
  pwa: {
    name: '东师校会官网', // SW注册后的应用名称
    themeColor: '#3cba63', // 主题色
    msTileColor: '#3cba63',
    appleMobileWebAppCapable: 'yes', // iOS启用SW
    appleMobileWebAppStatusBarStyle: 'black', // iOS状态栏样式,可选"black-translucent","black","default"
    iconPaths: { // 图标路径
      favicon32: 'img/icons/favicon32.png',
      favicon16: 'img/icons/favicon16.png',
      appleTouchIcon: 'img/icons/appleIcon152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msIcon144.png'
    },
    // 配置 workbox 插件
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      swDest: 'service-worker/service-worker.js', // serviceworker存放地点
      importWorkboxFrom: 'local', // service worker引入方式
      importsDirectory: 'service-worker' // service-worker文件存放路径
    },
    manifestPath: 'service-worker/manifest.json'
  }
};
