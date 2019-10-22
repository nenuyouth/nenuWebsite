/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Mutation文件
 * @Date: 2019-03-25 10:37:09
 * @LastEditTime: 2019-09-15 17:18:09
 */
import Vue from 'vue';
import { BaseState } from './state';

const myMutation = {

  /**
   * 储存编译好的指南页面
   *
   * @param state state
   * @param compiledGuide [指南页面路径, 指南页面html string]
   */
  compiledGuide(state: BaseState, compiledGuide: string[]) {
    Vue.set(state.compiledGuide, compiledGuide[0], compiledGuide[1]);
  },

  /**
   * 储存编译好的文档页面
   *
   * @param state state
   * @param compiledDoc [文档页面路径, 文档页面html string]
   */
  compiledDoc(state: BaseState, compiledDoc: string[]) {
    Vue.set(state.compiledDoc, compiledDoc[0], compiledDoc[1]);
  },

  /**
   * 设置环境变量
   *
   * @param state state
   * @param envOption 环境变量选项
   */
  env(state: BaseState, envOption: Record<string, any>) {
    Object.keys(envOption).forEach(prop => {
      if (prop.indexOf('VUE_APP_') !== -1) {
        envOption[prop.slice(8)] = envOption[prop];
        delete envOption[prop];
      }
    });
    state.env = envOption;
  },

  /**
   * 设置登陆状态
   *
   * @param state state
   * @param key login标识符
   */
  login(state: BaseState, key: string) {
    state.loginStatus[key] = true;
  },

  /**
   * 设置密码
   *
   * @param state state
   * @param msg 密码详情
   */
  password(state: BaseState, msg: string[]) {
    state.password[msg[0]] = msg[1];
  },

  /**
   * 设置加载文档状态
   *
   * @param state state
   * @param docLoading 文档加载状态
   */
  loadDoc(state: BaseState, docLoading: boolean) {
    state.docLoading = docLoading;
  },

  /**
   * 夜间模式开关
   *
   * @param state state
   */
  nightmode(state: BaseState) {
    state.nightmode = !state.nightmode;
  },

  /**
   * 设置当前路径
   *
   * @param state state
   * @param path 当前的路径
   */
  path(state: BaseState, path: string) {
    state.path = path;
  }
};

export default myMutation;
