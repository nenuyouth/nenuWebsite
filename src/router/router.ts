/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: router配置文件
 * @Date: 2019-02-26 23:43:23
 * @LastEditTime: 2019-03-25 12:33:38
 */

import Vue from 'vue';
import Router from 'vue-router';
import myRoute from './route';

Vue.use(Router); // 使用官方Router

// tslint:disable-next-line: no-var-requires
Vue.use(require('vue-wechat-title')); // 启用wechat客户端内对title属性的支持。

/**
 * @description: 暴露Router对象
 * @param {router} router配置
 * @return: router对象
 */
export default new Router({
  // 使用html5的history API
  mode: 'history',

  // 设置根目录为环境变量BASE_URL
  base: process.env.BASE_URL,

  // 设置路由配置
  routes: myRoute,

  /**
   * 保存滚动位置
   *
   * @param to 新页面route对象
   * @param from 旧页面route对象
   * @param savedPosition 上次保存的滚动位置
   * @returns 返回网页滚动位置
   */
  scrollBehavior(to, from, savedPosition) {

    return savedPosition || { x: 0, y: 0 };
  }
});
