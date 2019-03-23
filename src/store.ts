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

interface DocList {
  [propName: string]: string;
}
interface MenuList {
  key: string;
  title: string;
  children?: MenuList;
}

export interface State {
  Android: boolean;
  iOS: boolean;
  OSVersion: string;
  compiledMarkdown: DocList;
  docLoading: boolean;
  internalLogin: boolean;
  internalPassword: string;
  menuList: MenuList[];
  nightmode: boolean;
}

const myState: State = {
  Android: false,
  iOS: false,
  OSVersion: '',
  compiledMarkdown: {},
  docLoading: true,
  internalLogin: false,
  internalPassword: '',
  menuList: [],
  nightmode: false
};

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
    }
  },
  actions: {}
});
