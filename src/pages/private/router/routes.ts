/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 路由配置文件
 * @Date: 2019-03-25 12:27:33
 * @LastEditTime: 2019-07-03 11:39:47
 */
import Main from "@/pages/private/views/Main.vue";
import Page404 from "@/views/Page404.vue";

const route = [
  {
    path: "/",
    meta: { title: "内部管理" },
    component: Main,
  },
  {
    path: "/jsonEditor",
    meta: { title: "小程序页面修改" },
    component: () =>
      import(/* webpackChunkName: "json" */ "../views/JsonEditor.vue"),
  },
  {
    path: "/jsonEdit",
    meta: { title: "JSON编辑器" },
    component: () =>
      import(/* webpackChunkName: "json" */ "../components/JsonEdit.vue"),
  },
  {
    path: "/mdEditor",
    meta: { title: "Markdown编辑器" },
    component: () => import("../views/MarkdownEditor.vue"),
  },
  {
    path: "*",
    name: "404",
    meta: { title: "未找到界面" },
    component: Page404,
  },
];

export default route;
