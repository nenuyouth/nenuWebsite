/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: vue config file
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-09-19 17:09:03
 */
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// 判断环境
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Webpack链式处理
 *
 * @param {object} config Webpack配置
 * @returns {void}
 */
const chainWebpack = config => {
  // 添加打包时的eslint提示
  config.module.rule('eslint');
  config.module.rule('eslint').use('eslint-loader');

  // 处理SVG模块
  const svgRule = config.module.rule('svg');

  svgRule.uses.clear();
  svgRule
    .use('babel-loader').loader('babel-loader').end()// 预先对vue-svg-loader进行处理使其遵守es5标准
    .use('vue-svg-loader')
    .loader('vue-svg-loader')
    .options({ // 对svg进行处理
      plugins: [
        { removeDoctype: true },
        { removeComments: true },
        { removeViewBox: false }
      ],
      removeViewBox: false
    }); // 调用vue-svg-loader

};

/**
 * Webpack配置
 *
 * @param {object} config Webpack配置
 * @returns {void}
 */
const configureWebpack = config => {
  const myaliasconfig = {
    '|': path.resolve(__dirname, 'src/assets/'),
    '#': path.resolve(__dirname, 'src/components/'),
    '%': path.resolve(__dirname, 'src/utils/'),
    icon: path.resolve(__dirname, 'node_modules/@ant-design/icons/lib/'), // 减小Icon.ts体积
    ol: path.resolve(__dirname, 'node_modules/@ant-design/icons/lib/outline'), // 减小Icon.ts体积
    '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/utils/icon') // 减小 antdIcon 体积
  };

  config.resolve.alias = { ...config.resolve.alias || {}, ...myaliasconfig }; // 配置解析别名，可以简写
  config.resolve.extensions = [ // 配置解析扩展
    ...config.resolve.extensions || [], '.svg'
  ];
  config.resolve.modules = [path.resolve(__dirname, 'src'), 'node_modules']; // 配置模块解析方式，可加快解析速度

  // 生产环境配置
  if (isProduction) {
    // 使用CDN外部引入组件
    config.externals = {
      axios: 'axios',
      jquery: '$',
      tinycolor2: 'tinycolor',
      viewerjs: 'Viewer',
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex'
    };

    // 提出性能要求
    config.performance = {
      hints: 'warning',
      maxEntrypointSize: 1048576,
      maxAssetSize: 1048576
    };

    /*
     * config.optimization = {
     *   // 为 webpack 运行时代码创建单独的chunk
     *   runtimeChunk: { name: 'manifest' },
     *   // chunk分离设置
     *   splitChunks: {
     *     chunks: 'async',
     *     minSize: 30000,
     *     maxSize: 0,
     *     minChunks: 1,
     *     maxAsyncRequests: 10,
     *     maxInitialRequests: 5,
     *     automaticNameDelimiter: '-',
     *     name: true,
     *     cacheGroups: {
     *       antd: { // 分离ant-design模块
     *         test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/u,
     *         name: 'antd',
     *         chunks: 'all',
     *         priority: -8
     *       },
     *       common: { // 分离其他
     *         test: /[\\/]node_modules[\\/](lodash|vue-class-component)[\\/]/u,
     *         // test: /[\\/]node_modules[\\/](axios|lodash|jquery|tinycolor2|viewerjs|vue(-class-component|-router|x)?)[\\/]/u,
     *         name: 'common',
     *         chunks: 'all', // valid values are all, async, and initial
     *         priority: -9
     *       },
     *       vendors: {
     *         test: /[\\/]node_modules[\\/]/u,
     *         priority: -10
     *       },
     *       combine: { // 默认块，最小重用两次，优先级最低，不包含已有的chunk内容
     *         minChunks: 2,
     *         priority: -20,
     *         reuseExistingChunk: true // if the chunk contains modules already split out , will be reused
     *       }
     *     }
     *   }
     * };
     */

  } else config.devtool = 'source-map';

  if (process.env.ANALYZE)  // 分析打包后代码
    config.plugins.push(new BundleAnalyzerPlugin({ // 使用webpack分析插件
      analyzerPort: 0, // 让node使用随机端口
      defaultSizes: 'gzip' // 默认展示gzip大小
    }));
};

/**
 * vue输出配置
 *
 * @property {string} publicPath @default '/' 网站在服务器上的部署位置
 * @property {string} outputDir @default 'dist' 编译输出目录
 * @property {string} assetsDir @default '' 放置生成的静态资源相对于outputDir的目录
 * @property {string} indexPath @default 'index.html' 指定生成的主页文件相对于outputDir的输出路径，也可以是一个绝对路径。
 * @property {string} filenameHashing @default true 文件名hash处理
 * @property {boolean|'error'} lintOnSave @default true 是否在开发环境下通过eslint-loader在每次保存时lint代码
 * @property {boolean} runtimeCompiler @default false 是否使用包含运行时编译器的 Vue 构建版本
 * @property {boolean} productionSourceMap @default true 生产环境是否生产SourceMap
 * @property {string} crossorigin CORS设置
 * @property {function} chainWebpack 链式处理Webpack
 * @property {function|object} configureWebpack Webpack配置
 * @property {object} devServer 开发服务器配置
 * @property {object} pwa Progressive App支持
 */
module.exports = {


  // 在 multi-page 模式下构建应用

  pages: require('./mutiPage'),
  publicPath: process.env.DeployAddress || '/',
  productionSourceMap: false,
  crossorigin: 'anonymous',
  chainWebpack,
  configureWebpack,
  transpileDependencies: ['ant-design-vue'], // 需要babel-pollyfill处理的模块
  devServer: {
    compress: true, // 启用gzip压缩
    // https: true, // 启用Https，目前由于本地服务器未能支持https而暂时关闭
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
          'primary-color': '#2ecc71',
          'link-color': '#2ecc71'
        },
        javascriptEnabled: true
      }
    }
  },
  pwa: {
    name: '东师校会官网', // SW注册后的应用名称
    themeColor: '#2ecc71', // 主题色
    msTileColor: '#2ecc71', // 微软磁贴颜色
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
