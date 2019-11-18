/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: vue config file
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-11-19 00:08:41
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
  // 处理SVG模块
  const svgRule = config.module.rule('svg');

  svgRule.uses.clear();
  svgRule
    .use('babel-loader')
    .loader('babel-loader')
    .end() // 预先对vue-svg-loader进行处理使其遵守es5标准
    .use('vue-svg-loader')
    .loader('vue-svg-loader')
    .options({
      // 对svg进行处理
      plugins: [
        { removeDoctype: true },
        { removeComments: true },
        { removeViewBox: false }
      ],
      removeViewBox: false
    }); // 调用vue-svg-loader
};

/** 别名配置 */
const myaliasconfig = {
  '|': path.resolve(__dirname, 'src/assets/'),
  '#': path.resolve(__dirname, 'src/components/'),
  '%': path.resolve(__dirname, 'src/utils/'),
  icon: path.resolve(__dirname, 'node_modules/@ant-design/icons/lib/'), // 减小Icon.ts体积
  ol: path.resolve(__dirname, 'node_modules/@ant-design/icons/lib/outline'), // 减小Icon.ts体积
  '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/utils/icon') // 减小 antdIcon 体积
};

/** 块配置 */
const optimization = {
  // 为 webpack 运行时代码创建单独的chunk
  runtimeChunk: { name: 'manifest' },
  // chunk分离设置
  splitChunks: {
    chunks: 'async',
    minSize: 30000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 10,
    maxInitialRequests: 5,
    automaticNameDelimiter: '-',
    name: true,
    cacheGroups: {
      // 分离ant-design模块
      antd: {
        test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/u,
        name: 'antd',
        chunks: 'all',
        priority: -8
      },
      // 分离其他
      common: {
        test: /[\\/]node_modules[\\/](lodash|vue-class-component)[\\/]/u,
        // test: /[\\/]node_modules[\\/](axios|lodash|jquery|tinycolor2|viewerjs|vue(-class-component|-router|x)?)[\\/]/u,
        name: 'common',
        chunks: 'all', // valid values are all, async, and initial
        priority: -9
      },
      vendors: {
        test: /[\\/]node_modules[\\/]/u,
        priority: -10
      },
      // 默认块，最小重用两次，优先级最低，不包含已有的chunk内容
      combine: {
        minChunks: 2,
        priority: -20,

        // if the chunk contains modules already split out , will be reused
        reuseExistingChunk: true
      }
    }
  }
};

/**
 * Webpack配置
 *
 * @param {object} config Webpack配置
 * @returns {void}
 */
const configureWebpack = config => {
  config.resolve.alias = { ...(config.resolve.alias || {}), ...myaliasconfig }; // 配置解析别名，可以简写
  config.resolve.extensions = [
    // 配置解析扩展
    ...(config.resolve.extensions || []),
    '.svg'
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

    config.optimization = optimization;
  } else config.devtool = 'source-map';

  // 分析打包后代码
  if (process.env.ANALYZE)
    config.plugins.push(
      // 使用 webpack 分析插件
      new BundleAnalyzerPlugin({
        analyzerPort: 0, // 让 node 使用随机端口
        defaultSizes: 'gzip' // 默认展示 gzip 大小
      })
    );
};

/**
 * vue 输出配置
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
    // 浮层
    overlay: {
      warnings: false,
      errors: true
    },

    // 代理设置
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
    },
    open: 'Google Chrome' // 开发环境打开浏览器
  },
  css: {
    // 向 CSS 相关的 loader 传递选项
    loaderOptions: {
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
    // 图标路径
    iconPaths: {
      favicon32: 'img/icons/favicon-32.png',
      favicon16: 'img/icons/favicon-16.png',
      appleTouchIcon: 'img/icons/apple-icon-152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/mstile-150.png'
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
    // 定义 manifest.json
    manifestOptions: {
      name: '东师校会官网',
      short_name: '东师校会官网',
      description: '服务东师学子',
      icons: [
        {
          src: '/img/icons/chrome-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/img/icons/chrome-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      start_url: './index.html',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#2ecc71'
    }
  }
};
