/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: router配置文件
 * @Date: 2019-02-26 23:43:23
 * @LastEditTime: 2019-09-15 15:59:30
 */

import Vue from 'vue';
import Router from 'vue-router';
import routes from './route';

Vue.use(Router); // 使用官方Router

// eslint-disable-next-line @typescript-eslint/no-var-requires
Vue.use(require('vue-wechat-title')); // 启用wechat客户端内对title属性的支持。

export default new Router({
  // 设置路由配置
  routes,

  // 使用html5的history API
  mode: 'history',

  // 设置根目录为环境变量BASE_URL
  base: `${process.env.BASE_URL}private/`,

  /**
   * 保存滚动位置
   *
   * @param to 新页面route对象
   * @param from 旧页面route对象
   * @param savedPosition 上次保存的滚动位置
   * @returns 返回网页滚动位置
   */
  scrollBehavior: (to, from, savedPosition) => savedPosition || { x: 0, y: 0 }
});