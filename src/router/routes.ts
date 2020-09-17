/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Main from "@/views/Main.vue";
import Page404 from "@/views/Page404.vue";
import { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
  {
    path: "/",
    alias: "/index.html",
    name: "main",
    component: Main,
  },
  {
    path: "/guide",
    name: "guide",
    meta: { title: "新生攻略" },
    // 使用import来进行异步调用实现懒加载，打包时，webpack会识别webpackChunkName注释，将相同的一起打包一同执行懒加载
    component: () =>
      import(/* webpackChunkName: "guide" */ "@/views/Guide.vue"),
  },
  {
    path: "/page/:path",
    alias: "/guide/:path",
    props: true,
    meta: { title: "东师指南" },
    component: () => import(/* webpackChunkName: "guide" */ "@/views/Page.vue"),
  },
  {
    path: "/lecture",
    name: "lecture",
    meta: { title: "讲座信息" },
    component: () =>
      import(/* webpackChunkName: "tool" */ "@/views/Lecture.vue"),
  },
  {
    path: "/lecture/:school",
    name: "lectureDetail",
    meta: { title: "讲座信息" },
    component: () =>
      import(/* webpackChunkName: "tool" */ "@/views/Lecture.vue"),
  },
  {
    path: "/tool/calendar",
    name: "calendar",
    meta: { title: "东师校历" },
    component: () =>
      import(/* webpackChunkName: "tool" */ "@/views/tools/Calendar.vue"),
  },
  {
    path: "/tool/calendar/:time",
    name: "calendarDetail",
    meta: { title: "校历详情" },
    component: () =>
      import(/* webpackChunkName: "tool" */ "@/views/tools/CalendarDetail.vue"),
  },
  {
    path: "/tool/schoolGzh",
    name: "schoolGzh",
    meta: { title: "学院矩阵" },
    component: () =>
      import(/* webpackChunkName: "tool" */ "@/views/tools/SchoolGzh.vue"),
  },
  {
    path: "/tool/netCharge",
    name: "NetCharge",
    meta: { title: "网费充值" },
    component: () =>
      import(/* webpackChunkName: "tool" */ "@/views/tools/NetCharge.vue"),
  },
  {
    path: "/tool/elective",
    name: "Elective",
    meta: { title: "选课系统" },
    component: () =>
      import(/* webpackChunkName: "tool" */ "@/views/tools/Elective.vue"),
  },
  {
    path: "/about/Mr-Hope",
    name: "mrhope",
    meta: { title: "Mr.Hope简介" },
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/about/MrHope.vue"),
  },
  {
    path: "*",
    name: "404",
    meta: { title: "未找到界面" },
    component: Page404,
  },
];

export default routes;
