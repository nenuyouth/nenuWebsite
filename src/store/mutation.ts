/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Mutation文件
 * @Date: 2019-03-25 10:37:09
 * @LastEditTime: 2019-04-26 12:02:04
 */
import Vue from 'vue';
import { BaseState, MenuList } from './state';

const myMutation = {
  /**
   * @description: 设置终端为安卓
   *
   * @param state state
   */
  android(state: BaseState) {
    state.Android = true;
  },

  /**
   * @description: 储存编译好的指南页面
   *
   * @param state state
   * @param compiledGuide [指南页面路径, 指南页面html string]
   */
  compiledGuide(state: BaseState, compiledGuide: string[]) {
    Vue.set(state.compiledGuide, compiledGuide[0], compiledGuide[1]);
  },

  /**
   * @description: 储存编译好的文档页面
   *
   * @param state state
   * @param compiledDoc [文档页面路径, 文档页面html string]
   */
  compiledDoc(state: BaseState, compiledDoc: string[]) {
    Vue.set(state.compiledDoc, compiledDoc[0], compiledDoc[1]);
  },

  /**
   * @description: 设置终端为iOS
   *
   * @param state state
   */
  iOS(state: BaseState) {
    state.iOS = true;
  },

  /**
   * @description: 设置内部文档登陆成功状态
   *
   * @param state state
   */
  internalLogin(state: BaseState) {
    state.internalLogin = true;
  },

  /**
   * @description: 设置内部文档登陆成功状态
   *
   * @param state state
   * @param password 设置内部文档密码
   */
  internalPassword(state: BaseState, password: string) {
    state.internalPassword = password;
  },

  /**
   * @description: 设置加载文档状态
   *
   * @param state state
   * @param docLoading 文档加载状态
   */
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
