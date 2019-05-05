/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: vue config file
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-05-04 19:47:59
 */

/**
 * @description: vue输出配置
 *
 * @property {string} publicPath @default '/' 网站在服务器上的部署位置
 * @property {string} outputDir @default 'dist' 编译输出目录
 * @property {string} assetsDir @default '' 放置生成的静态资源相对于outputDir的目录
 * @property {string} indexPath @default 'index.html' 指定生成的主页文件相对于outputDir的输出路径，也可以是一个绝对路径。
 * @property {string} filenameHashing @default true 文件名hash处理
 * @property {boolean | 'error'} lintOnSave @default true 是否在开发环境下通过eslint-loader在每次保存时lint代码
 * @property {boolean} runtimeCompiler @default false 是否使用包含运行时编译器的 Vue 构建版本
 * @property {boolean} productionSourceMap @default true 生产环境是否生产SourceMap
 */
module.exports = {
  // pages: undefined, // type is Object
  productionSourceMap: false, // 生产环境是否生产SourceMap
  crossorigin: 'anonymous', // CORS设置
  chainWebpack: config => { // 链式处理Webpack
    // 处理SVG模块
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();
    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  },
  configureWebpack: config =>
    process.env.NODE_ENV === 'production'
      ? { // 开发环境配置
        devtool: 'source-map',
        performance: {
          hints: 'warning',
          maxEntrypointSize: 524288,
          maxAssetSize: 1048576
        }
      }
      : { devtool: 'inline-source-map' },
  devServer: { // 开发服务器配置
    https: true, // 启用Https
    compress: true, // 启用gzip压缩
    overlay: { // 浮层
      warnings: false,
      errors: true
    },
    proxy: { // 代理设置
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
    },
    open: 'Google Chrome' // 开发环境打开浏览器
  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
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
    appleMobileWebAppStatusBarStyle: 'default', // iOS状态栏样式,可选"black-translucent","black","default"
    iconPaths: { // 图标路径
      favicon32: 'img/icons/favicon32.png',
      favicon16: 'img/icons/favicon16.png',
      appleTouchIcon: 'img/icons/appleIcon152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msIcon144.png'
    },
    // 配置 workbox 插件
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker/serviceWorker.js', // Service-worker脚本路径
      swDest: 'service-worker/service-worker.js', // serviceworker存放地点
      importWorkboxFrom: 'local', // service worker引入方式
      importsDirectory: 'service-worker', // service-worker文件存放路径
      maximumFileSizeToCacheInBytes: '10485760'
    },
    manifestPath: 'manifest.json' // 定义manifest路径
  }
};
