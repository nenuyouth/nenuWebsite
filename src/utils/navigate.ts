/*
 * @Author: Mr.Hope
 * @Date: 2019-06-20 18:38:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-06-20 18:55:39
 * @Description: 导航插件
 */
import VueRouter, { Route } from "vue-router";
import { VueConstructor } from "vue";

const navigate = (
  url: string | undefined,
  router: VueRouter,
  route: Route
): Promise<Route> | void => {
  if (url) {
    if (url && url[0] === "/")
      // Inner absolute path
      return router.push(url);

    if (url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1)
      // Outter url
      window.open(url);
    else {
      // Inner relative path
      const base = route.path.slice(0, route.path.lastIndexOf("/"));

      return router.push(`${base}/${url}`);
    }
  }
};

export default {
  install: (ctx: VueConstructor): void => {
    ctx.prototype.$navigate = navigate;
  },
};
