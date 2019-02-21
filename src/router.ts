import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import Page404 from "./views/Page404.vue";

// import Title from "vue-wechat-title";

Vue.use(Router); // 使用官方Router

// Vue.use(Title); // 启用wechat客户端内对title属性的支持。

// 暴露Router对象
export default new Router({
  // 使用html5的history API
  mode: "history",

  // 设置根目录为环境变量BASE_URL
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "main",
      meta: { title: "东北师范大学学生会" },
      component: Main
    }, {
      path: "*",
      name: "404",
      meta: { title: "未找到界面" },
      component: Page404
    }
  ],
  // 记住滚动位置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    else return { x: 0, y: 0 };
  }
});
