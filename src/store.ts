/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: store配置文件
 * @Date: 2019-02-24 22:21:25
 * @LastEditTime: 2019-03-07 13:14:57
 */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);// 使用Vuex

export default new Vuex.Store({
  state: {
    compiledMarkdown: '',
    internalLogin: false
  },
  mutations: {
    internalLogin(state) {
      state.internalLogin = true;
    },
    compiledMarkdown(state, compiledMarkdown) {
      state.compiledMarkdown = compiledMarkdown;
    }
  },
  actions: {}
});
