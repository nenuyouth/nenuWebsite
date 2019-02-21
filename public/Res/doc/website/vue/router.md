# Vue Router讲解

> 作者：Mr.Hope 最后编辑于2019/02/18

Vue Router是Vue官方出品的路由组件，托管整个Vue项目路由。
其配置文件位于src文件夹下，名称为Router.ts

该文件向外暴露一个默认的new Router对象。

在日常开发中，我们只需要关注默认暴露对象的route属性。

route属性是一个数组，其每一个元素都包含了页面的url与其对应的vue文件的对应关系，同时可以用name指定其别名，meta属性可以包含该界面的额外信息(比如title)

也就是说，Vue项目网站能够访问到的地址都能够被route数组中的某个元素的path值所匹配，此时页面展示的是该元素component属性对应的vue文件视图。

当希望在Vue项目中添加新的界面的时候，只需制作好其vue文件，并在route数组中添加新项，指定对应的vue文件与对用的url路径即可。

下面是目前项目中使用的Route.ts文件

```js
import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import Page404 from "./views/Page404.vue";
import Title from "vue-wechat-title";

Vue.use(Router); // 使用官方Router

Vue.use(Title); // 启用wechat客户端内对title属性的支持。

export default new Router({
  mode: "history", // 使用html5的history API
  base: process.env.BASE_URL, // 设置根目录为环境变量BASE_URL
  routes: [
    {
      path: "/",
      name: "main",
      meta: { title: "东北师范大学学生会" },
      component: Main
    },
    {
      path: "/guide",
      name: "guide",
      meta: { title: "东师指南" },
      component: () => import(/* webpackChunkName: "guide" */ "./views/Guide.vue")

      // 使用import来进行异步调用实现懒加载，打包时，webpack会识别webpackChunkName注释，将相同的一起打包一同执行懒加载
    },
    {
      path: "/test",
      name: "test",
      component: () => import(/* webpackChunkName: "test" */ "./views/Test.vue")
    },
    { path: "/page", redirect: "/guide" },
    {
      path: "/page/:path",
      alias: "/guide/:path",
      props: true,
      meta: { title: "东师指南" },
      component: () => import(/* webpackChunkName: "page" */ "./views/Page.vue")
    },
    { path: "/doc/main", redirect: "/doc" },
    {
      path: "/doc/:path1?/:path2?/:path3?/:path4?",
      props: true,
      meta: { title: "内部文档" },
      component: () => import(/* webpackChunkName: "doc" */ "./views/Doc.vue")
    },
    {
      path: "/tool/calendar",
      name: "calendar",
      meta: { title: "东师校历" },
      component: () => import(/* webpackChunkName: "tool" */ "./views/tool/Calendar.vue")
    },
    {
      path: "/tool/schoolGzh",
      name: "schoolGzh",
      meta: { title: "学院矩阵" },
      component: () => import(/* webpackChunkName: "tool" */ "./views/tool/SchoolGzh.vue")
    },
    {
      path: "/tool/NetCharge",
      name: "NetCharge",
      meta: { title: "网费充值" },
      component: () => import(/* webpackChunkName: "tool" */ "./views/tool/NetCharge.vue")
    },
    {
      path: "/scence",
      name: "scence",
      component: () => import(/* webpackChunkName: "scence" */ "./views/scence/Scence.vue")
    },
    {
      path: "/scence/benbu",
      name: "benbuScence",
      component: () => import(/* webpackChunkName: "scence" */ "./views/scence/Benbu.vue")
    },
    {
      path: "/scence/jingyue",
      name: "jingyueScence",
      component: () => import(/* webpackChunkName: "scence" */ "./views/scence/Jingyue.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import(/* webpackChunkName: "about" */ "./views/about/About.vue")
    },
    {
      path: "/about/intro",
      name: "intro",
      component: () => import(/* webpackChunkName: "about" */ "./views/about/Intro.vue")
    },
    {
      path: "/about/mrhope",
      name: "mrhope",
      component: () => import(/* webpackChunkName: "about" */ "./views/about/MrHope.vue")
    }, {
      path: "/about/coperation",
      name: "coperation",
      component: () => import(/* webpackChunkName: "about" */ "./views/about/Coperation.vue")
    }, {
      path: "/about/media",
      name: "media",
      component: () => import(/* webpackChunkName: "about" */ "./views/about/Media.vue")
    }, {
      path: "/about/qq",
      name: "qq",
      component: () => import(/* webpackChunkName: "about" */ "./views/about/QQ.vue")
    }, {
      path: "/about/douyin",
      name: "douyin",
      component: () => import(/* webpackChunkName: "about" */ "./views/about/Douyin.vue")
    }, {
      path: "/about/wechat",
      name: "wechat",
      component: () => import(/* webpackChunkName: "about" */ "./views/about/Wechat.vue")
    }, {
      path: "/about/question",
      name: "question",
      component: () => import(/* webpackChunkName: "about" */ "./views/about/Question.vue")
    }, {
      path: "*",
      name: "404",
      component: Page404
    }
  ],
  // 记住滚动位置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    else return { x: 0, y: 0 };
  }
});
```