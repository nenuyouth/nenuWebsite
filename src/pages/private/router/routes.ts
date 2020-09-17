/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

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
