# Vue Router讲解

> 作者：Mr.Hope 最后编辑于2019/02/18

## 介绍

Vue Router是Vue官方出品的路由组件，托管整个Vue项目路由。其配置文件位于src文件夹下，名称为Router.ts

## 配置文件说明

配置文件会引入node模块`vue-router`，并配置信息，最终向外暴露一个添加了配置信息的`Router对象`。

在日常开发中，我们只需要关注默认暴露对象的route属性。(其他属性已经在下方用注释简要说明)

### Route属性

route属性是一个数组，其每一个元素是一个对象，对象会包含`path`,`component`两个必填属性与`meta`和`name`两个可选属性。

- path: 填入需要配置的网站页面的url

- conponent：导入需要显示的Vue文件组件

- name(可选)：指定该组件与url的别名

- meta(可选)：该属性可以填入该界面的额外信息(比如title、author等)

也就是说，Vue项目网站能够访问到的地址都能够被route数组中的某个元素的path值所匹配，此时页面展示的是该元素component属性对应的vue文件视图。

当希望在Vue项目中添加新的界面的时候，只需制作好其vue文件，并在route数组中添加新项，指定对应的vue文件与对用的url路径即可。

---

下面是目前项目中使用的Route.ts文件

```js
import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import Page404 from "./views/Page404.vue";

Vue.use(Router); // 使用官方Router

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
    },
    {
      path: "/guide",
      name: "guide",
      meta: { title: "东师指南" },
      // 使用import来进行异步调用实现懒加载，打包时，webpack会识别webpackChunkName注释，将相同的一起打包一同执行懒加载
      component: () => import(/* webpackChunkName: "guide" */ "./views/Guide.vue")
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
      path: "*",
      name: "404",
      meta: { title: "未找到界面" },
      component: Page404
    }
  ],
  // 记住滚动位置
  scrollBehavior(to, from, savedPosition) {
    let position;

    if (savedPosition) position = savedPosition;
    else position = { x: 0, y: 0 };

    return position;
  }
});
```