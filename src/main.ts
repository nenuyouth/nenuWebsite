import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 此部分仍待修复
// tslint:disable-next-line: no-import-side-effect
import "./registerServiceWorker";

// 引入font-awesome
// import "font-awesome/css/font-awesome.css";

// 自定义组件部分
import MyNav from "./components/MyNav.vue";
import MyFooter from "./components/MyFooter.vue";

// 自定义css样式
import "./lib/public.css";

Vue.config.productionTip = false; // 阻止 vue 在启动时生成生产提示。

new Vue({
  router,
  store,
  render: h => h(App) // render函数创建了一个元素
}).$mount("#app"); // 创建元素被挂载到id='app'元素上，挂载时会销毁被挂载元素实例

// 挂载自定义nav与footer组件
new Vue({
  router,
  render: h => h(MyNav)
}).$mount("nav");
new Vue({
  router,
  render: h => h(MyFooter)
}).$mount("footer");
