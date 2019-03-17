/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 主脚本文件
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-03-17 19:38:32
 */

/* eslint-disable no-console */
// tslint:disable no-console

// 引入Ant Design
import {
  Button, Input, Modal, Spin, message
} from 'ant-design-vue';

import { register } from 'register-service-worker';
import Vue from 'vue';
import Component from 'vue-class-component';
import App from './App.vue';
import router from './router';
import store from './store';

// 自定义组件部分
import BaseNav from './components/BaseNav.vue';
import BaseFooter from './components/BaseFooter.vue';

// 自定义css样式
import './lib/public.css';


// 在组件实例中Hook route方法
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);

/*
 * 引入font-awesome
 * import "font-awesome/css/font-awesome.css";
 */

// 使用ant-design
Vue.use(Button);
Vue.use(Input);
Vue.use(Modal);
Vue.use(Spin);

// 向Vue中封装ant-design方法
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$error = Modal.error;
Vue.prototype.$info = Modal.info;
Vue.prototype.$message = message;
Vue.prototype.$success = Modal.success;
Vue.prototype.$warning = Modal.warning;

// 注册service worker
if (process.env.NODE_ENV === 'production')
  register(`${process.env.BASE_URL}service-worker.js`, {
    registrationOptions: { scope: './' },
    ready() {
      console.log('APP已被service worker接管缓存');
    },
    cached() {
      console.log('内容已经被缓存以离线显示');
    },
    updated() {
      console.log('内容已更新，请刷新');
    },
    offline() {
      console.log('未检测到网络连接，APP以离线模式启动');
    },
    error(error) {
      console.error('Service worker注册出现错误:', error);
    }
  });

// 阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App) // render函数创建了一个元素
}).$mount('#app'); // 创建元素被挂载到id='app'元素上，挂载时会销毁被挂载元素实例

// 挂载自定义nav与footer组件
new Vue({
  router,
  render: h => h(BaseNav)
}).$mount('nav');

new Vue({
  router,
  render: h => h(BaseFooter)
}).$mount('footer');

/*
 * FIXME:注册页面跳转时页脚显示效果;
 * router.beforeEach((to, from, next) => {
 *   const windowWidth = $(window).width() || document.documentElement.clientWidth*
 *   $('#footer').css({ visibility: 'hidden', opacity: 0.01 });
 *   setTimeout(
 *     () => {
 *       $('#footer').css('visibility', '');
 *       Vue.nextTick().then(() => {
 *         $('#footer').css('opacity', 1);
 *       });
 *     },
 *     1000
 *   );
 * });
 */
