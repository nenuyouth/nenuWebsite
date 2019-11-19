/* eslint-disable sort-imports */
/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 主脚本文件
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-11-19 20:07:15
 */

// 引入Ant Design
import {
  Anchor,
  Breadcrumb,
  Button,
  Col,
  Form,
  Icon,
  Input,
  Layout,
  Menu,
  Modal,
  Row,
  Skeleton,
  Spin,
  Tooltip,
  message
} from 'ant-design-vue';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Route } from 'vue-router';

// 引入第三方库
import $ from 'jquery';
import debounce from 'lodash/debounce';

// 引入配置好的VueRouter与Vuex
import router from './router';
import store from './store';

// 引入Service-Worker
import registerSW from '@/service-worker';

// 引入Vue根元素
import Doc from './Doc.vue';

// 自定义css样式
import '%/customBootstrap.scss';
import '%/public.scss';

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
Vue.use(Col);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Modal);
Vue.use(Row);
Vue.use(Skeleton);
Vue.use(Spin);
Vue.use(Tooltip);

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
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1273079_vzgkl6rtnoa.js'
});

// 全局注册IconFont
Vue.component('icon-font', IconFont);

// 注册service worker
registerSW(store);

// 阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false;

// 在导航确认后立即更新path值
router.afterEach((to: Route) => {
  store.commit('path', to.path);
});

// 获得当前环境
store.dispatch('systemInfo');

// 写入环境变量
store.commit('env', process.env);

// 获取屏幕状态，并进行brakpoint状态监听
store.dispatch(
  'screen',
  $(window).width() || document.documentElement.clientWidth
);
window.addEventListener(
  'resize',
  debounce(() => {
    store.dispatch(
      'screen',
      $(window).width() || document.documentElement.clientWidth
    );
  }, 300)
);

// 声明Vue实例
new Vue({
  router,
  store,
  render: h => h(Doc) // render函数创建了一个元素
}).$mount('#app'); // 创建元素被挂载到id='app'元素上，挂载时会销毁被挂载元素实例
