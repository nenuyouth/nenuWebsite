/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: store配置文件
 * @Date: 2019-02-24 22:21:25
 * @LastEditTime: 2019-03-07 13:14:57
 */

import Vue from 'vue';
import Vuex from 'vuex';
import myMutation from './mutation';
import myState from './state';
import image from './module/image';
import screen from './module/screen';
import slide from './module/slide';
import systemInfo from './module/systeminfo';

Vue.use(Vuex);// 使用Vuex

export default new Vuex.Store({
  state: myState,
  modules: { image, screen, slide, systemInfo },
  mutations: myMutation
});
