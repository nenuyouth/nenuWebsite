/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 主脚本文件
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-04-29 23:45:53
 */

// 引入Ant Design
import {
  Anchor, Breadcrumb, Button, Card, Carousel, Col, Icon, Input,
  Layout, Menu, Modal, Row, Select, Skeleton, Spin, Timeline, message
} from 'ant-design-vue';
import { Route } from 'vue-router';
import Vue from 'vue';
import Component from 'vue-class-component';
import _ from 'lodash';
import App from './App.vue';
import registerServiceWorker from './registerServiceWorker';
import router from './router/router';
import store from './store/store';

// 自定义css样式
import './lib/customBootstrap.scss';
import './lib/public.css';

// 在组件实例中Hook route方法
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);

// 使用ant-design
Vue.use(Anchor);
Vue.use(Breadcrumb);
Vue.use(Button);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Modal);
Vue.use(Row);
Vue.use(Select);
Vue.use(Skeleton);
Vue.use(Spin);
Vue.use(Timeline);

// 配置message
message.config({
  top: '50px',
  duration: 3,
  maxCount: 3
});

// 向Vue中封装ant-design方法
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$error = Modal.error;
Vue.prototype.$info = Modal.info;
Vue.prototype.$message = message;
Vue.prototype.$success = Modal.success;
Vue.prototype.$warning = Modal.warning;

// 注册IconFont
const IconFont = Icon.createFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/font_1091332_oo8p0ei73l.js' });

// 全局注册IconFont
Vue.component('icon-font', IconFont);

// 注册service worker
registerServiceWorker();

// 阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false;

// 注册页面跳转时页脚先隐藏，防止页脚干扰显示
/*
 *router.beforeEach((to, from, next) => {
 *   $('#footer').css({ visibility: 'hidden', opacity: 0.01 });
 *   setTimeout(
 *     () => {
 *       $('#footer').css('visibility', '');
 *       Vue.nextTick().then(() => {
 *         $('#footer').fadeIn(500);
 *       });
 *     },
 *     1000
 *   );
 *   next();
 * });
 */

// 在导航确认后立即更新path值
router.afterEach((to: Route) => {
  store.commit('path', to.path);
});

// 获得当前环境
store.dispatch('systemInfo');

// 获取屏幕状态，并进行brakpoint状态监听
store.dispatch('screen', $(window).width() || document.documentElement.clientWidth);
$(window).on('resize', _.debounce(() => {
  store.dispatch('screen', $(window).width() || document.documentElement.clientWidth);
}, 300));

// 声明Vue实例
new Vue({
  router,
  store,
  render: h => h(App) // render函数创建了一个元素
}).$mount('#app'); // 创建元素被挂载到id='app'元素上，挂载时会销毁被挂载元素实例
