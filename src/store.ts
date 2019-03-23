/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: store配置文件
 * @Date: 2019-02-24 22:21:25
 * @LastEditTime: 2019-03-07 13:14:57
 */

import Vue from 'vue';
import Vuex from 'vuex';
import myState, { MenuList, State } from '@/store/state';

Vue.use(Vuex);// 使用Vuex

export default new Vuex.Store({
  state: myState,
  mutations: {
    android(state: State) {
      state.Android = true;
    },
    compiledMarkdown(state: State, compiledMarkdown: string[]) {
      Vue.set(state.compiledMarkdown, compiledMarkdown[0], compiledMarkdown[1]);
    },
    docLoading(state: State, docLoading: boolean) {
      state.docLoading = docLoading;
    },
    iOS(state: State) {
      state.iOS = true;
    },
    internalLogin(state: State) {
      state.internalLogin = true;
    },
    internalPassword(state: State, password: string) {
      state.internalPassword = password;
    },
    menuList(state: State, menuContent: MenuList[]) {
      state.menuList = menuContent;
    },
    version(state: State, version: string) {
      state.OSVersion = version;
    },
    nightmode(state: State) {
      state.nightmode = !state.nightmode;
    },
    path(state: State, path: string) {
      state.path = path;
    },
    screenWidth(state: State, width: number) {
      let status;
      if (width < 576 && state.screenStatus !== 'xs') status = 'xs';
      else if (width < 768 && state.screenStatus !== 'sm') status = 'sm';
      else if (width < 992 && state.screenStatus !== 'md') status = 'md';
      else if (width < 1200 && state.screenStatus !== 'lg') status = 'lg';
      else if (width < 1600 && state.screenStatus !== 'xl') status = 'xl';
      else if (state.screenStatus !== 'xxl') status = 'xxl';
      state.screenWidth = width;

      if (status) {
        Vue.set(state.screenDesc, state.screenStatus, false);
        Vue.set(state.screenDesc, status, true);
        state.screenStatus = status;
      }
    }
  },
  actions: {}
});
