/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Mutation文件
 * @Date: 2019-03-25 10:37:09
 * @LastEditTime: 2019-04-04 23:13:57
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
  iOS(state: BaseState) {
    state.iOS = true;
  },
  imageList(state: BaseState, imageList: string[]) {
    state.imageList = imageList;
  },
  internalLogin(state: BaseState) {
    state.internalLogin = true;
  },
  internalPassword(state: BaseState, password: string) {
    state.internalPassword = password;
  },
  loadDoc(state: BaseState, docLoading: boolean) {
    state.docLoading = docLoading;
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
