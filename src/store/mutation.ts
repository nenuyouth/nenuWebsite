/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Mutation文件
 * @Date: 2019-03-25 10:37:09
 * @LastEditTime: 2019-04-01 17:39:47
 */
import Vue from 'vue';
import { BaseState, MenuList } from './state';

const myMutation = {
  android(state: BaseState) {
    state.Android = true;
  },
  compiledGuide(state: BaseState, compiledGuide: string[]) {
    Vue.set(state.compiledGuide, compiledGuide[0], compiledGuide[1]);
  },
  compiledDoc(state: BaseState, compiledDoc: string[]) {
    Vue.set(state.compiledDoc, compiledDoc[0], compiledDoc[1]);
  },
  docLoading(state: BaseState, docLoading: boolean) {
    state.docLoading = docLoading;
  },
  iOS(state: BaseState) {
    state.iOS = true;
  },
  internalLogin(state: BaseState) {
    state.internalLogin = true;
  },
  internalPassword(state: BaseState, password: string) {
    state.internalPassword = password;
  },
  menuList(state: BaseState, menuContent: MenuList[]) {
    state.menuList = menuContent;
  },
  version(state: BaseState, version: string) {
    state.OSVersion = version;
  },
  nightmode(state: BaseState) {
    state.nightmode = !state.nightmode;
  },
  path(state: BaseState, path: string) {
    state.path = path;
  }
};

export default myMutation;
