/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Mutation文件
 * @Date: 2019-03-25 10:37:09
 * @LastEditTime: 2019-10-22 10:36:03
 */

import { BaseState } from "./state";

const myMutation = {
  /**
   * 设置环境变量
   *
   * @param state state
   * @param envOption 环境变量选项
   */
  env(state: BaseState, envOption: Record<string, any>) {
    Object.keys(envOption).forEach((prop) => {
      if (prop.indexOf("VUE_APP_") !== -1) {
        envOption[prop.slice(8)] = envOption[prop];
        delete envOption[prop];
      }
    });
    state.env = envOption;
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
  },
};

export default myMutation;
