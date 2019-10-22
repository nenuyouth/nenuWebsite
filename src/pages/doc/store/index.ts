/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: store配置文件
 * @Date: 2019-02-24 22:21:25
 * @LastEditTime: 2019-03-07 13:14:57
 */

import Vue from 'vue';
import Vuex, { Module } from 'vuex';
import myMutation from './mutation';
import myState, { BaseState } from './state';
import image, { ImageState } from '@/store/module/image';
import screen, { ScreenState } from '@/store/module/screen';
import slide, { SlideState } from '@/store/module/slide';
import systemInfo, { SystemState } from '@/store/module/systeminfo';
import serviceWorker, { SWState } from '@/store/module/service-worker';

Vue.use(Vuex); // 使用Vuex

export default new Vuex.Store({
  state: myState,
  modules: {
    image: image as Module<ImageState, BaseState>,
    screen: screen as Module<ScreenState, BaseState>,
    slide: slide as Module<SlideState, BaseState>,
    systemInfo: systemInfo as Module<SystemState, BaseState>,
    serviceWorker: serviceWorker as Module<SWState, BaseState>
  },
  mutations: myMutation
});
