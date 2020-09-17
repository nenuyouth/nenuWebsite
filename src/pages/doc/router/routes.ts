/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 路由配置文件
 * @Date: 2019-03-25 12:27:33
 * @LastEditTime: 2019-11-19 21:55:53
 */
import Page404 from "@/views/Page404.vue";
import { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
  { path: "/doc/readme", redirect: "/doc/" },
  { path: "/doc/:path1/readme", redirect: "/doc/:path1/" },
  { path: "/doc/:path1/:path2/readme", redirect: "/doc/:path1/:path2/" },
  {
    path: "/doc/:path1/:path2/:path3/readme",
    redirect: "/doc/:path1/:path2/:path3/",
  },
  {
    path: "/doc/:path1?/:path2?/:path3?/:path4?",
    meta: { title: false },
    // eslint-disable-next-line
    component: () => import("../views/InternalDoc.vue"),
  },
  {
    path: "*",
    name: "404",
    meta: { title: "未找到界面" },
    component: Page404,
  },
];

export default routes;
