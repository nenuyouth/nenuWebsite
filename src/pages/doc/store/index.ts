/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: store配置文件
 * @Date: 2019-02-24 22:21:25
 * @LastEditTime: 2019-03-07 13:14:57
 */

import Vuex, { Module } from "vuex";
import image, { ImageState } from "@/store/module/image";
import myState, { BaseState } from "./state";
import screen, { ScreenState } from "@/store/module/screen";
import serviceWorker, { SWState } from "@/store/module/service-worker";
import slide, { SlideState } from "@/store/module/slide";
import systemInfo, { SystemState } from "@/store/module/systeminfo";
import Vue from "vue";
import myMutation from "./mutation";

Vue.use(Vuex); // 使用Vuex

export default new Vuex.Store({
  state: myState,
  modules: {
    image: image as Module<ImageState, BaseState>,
    screen: screen as Module<ScreenState, BaseState>,
    slide: slide as Module<SlideState, BaseState>,
    systemInfo: systemInfo as Module<SystemState, BaseState>,
    serviceWorker: serviceWorker as Module<SWState, BaseState>,
  },
  mutations: myMutation,
});
