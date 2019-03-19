/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 主脚本文件
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-03-19 19:04:34
 */

// 引入Ant Design
import {
  Anchor, Button, Input, Modal, Skeleton, Spin, message
} from 'ant-design-vue';
import Vue from 'vue';
import Component from 'vue-class-component';
import App from './App.vue';
import getOS from './lib/getOS';
import registerServiceWorker from './registerServiceWorker';
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
Vue.use(Anchor);
Vue.use(Button);
Vue.use(Input);
Vue.use(Modal);
Vue.use(Skeleton);
Vue.use(Spin);

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

// 注册service worker
registerServiceWorker();

// 获得当前环境
getOS(store);

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
