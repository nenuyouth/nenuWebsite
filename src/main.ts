/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 主脚本文件
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-03-11 17:29:05
 */

/* eslint-disable no-console */
// tslint:disable no-console

import { register } from 'register-service-worker';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 自定义组件部分
import BaseNav from './components/BaseNav.vue';
import BaseFooter from './components/BaseFooter.vue';

// 自定义css样式
import './lib/public.css';

// 引入Ant Design
import { Button } from 'ant-design-vue';
Vue.use(Button);

if (process.env.NODE_ENV === 'production')
  register(`${process.env.BASE_URL}service-worker.js`, {
    registrationOptions: { scope: './' },
    ready() {
      console.log('App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB');
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updated() {
      console.log('New content is available; please refresh.');
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    }
  });


/*
 * 引入font-awesome
 * import "font-awesome/css/font-awesome.css";
 */

Vue.config.productionTip = false; // 阻止 vue 在启动时生成生产提示。

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

// FIXME:注册页面跳转时页脚显示效果;
// router.beforeEach((to, from, next) => {
//   const windowWidth = $(window).width() || document.documentElement.clientWidth;

//   $('#footer').css({ visibility: 'hidden', opacity: 0.01 });
//   setTimeout(
//     () => {
//       $('#footer').css('visibility', '');
//       Vue.nextTick().then(() => {
//         $('#footer').css('opacity', 1);
//       });
//     },
//     1000
//   );
// });
