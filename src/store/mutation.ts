/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Mutation文件
 * @Date: 2019-03-25 10:37:09
 * @LastEditTime: 2019-04-28 15:19:00
 */
import Vue from 'vue';
import { BaseState, MenuList } from './state';

const myMutation = {

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

  /**
   * @description: 设置Slide菜单内容
   *
   * @param state state
   * @param menuContent Slide菜单内容
   */
  menuList(state: BaseState, menuContent: MenuList[]) {
    state.menuList = menuContent;
  },

  /**
   * @description: 夜间模式开关
   *
   * @param state state
   */
  nightmode(state: BaseState) {
    state.nightmode = !state.nightmode;
  },

  /**
   * @description: 设置当前路径
   *
   * @param state state
   * @param path 当前的路径
   */
  path(state: BaseState, path: string) {
    state.path = path;
  }
};

export default myMutation;
