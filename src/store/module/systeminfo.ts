/*
 * @Author: Mr.Hope
 * @Date: 2019-06-26 20:26:14
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-07 20:16:56
 * @Description: Vuex SystemInfo Module
 */

import { ActionContext } from 'vuex';
import { BaseState } from '../state';

export interface SystemState {
  /** 是否是iOS系统 */
  iOS: boolean;
  /** 是否是安装系统 */
  Android: boolean;
  /** 是否是Microsoft Edge */
  Edge: boolean;
  /** 是否是Internet Explorer */
  IE: boolean;
  /** Internet Explorer版本号  */
  IEVersion: number;
  /** 操作系统版本号 */
  OSVersion: string;
}

const systemState: SystemState = {
  iOS: false,
  Android: false,
  Edge: false,
  IE: false,
  IEVersion: 0,
  OSVersion: ''
};

export default {
  state: systemState,
  mutations: {
    /**
     * 设置终端为安卓
     *
     * @param state state
     */
    android(state: SystemState) {
      state.Android = true;
    },

    /**
     * 设置终端为iOS
     *
     * @param state state
     */
    iOS(state: SystemState) {
      state.iOS = true;
    },
    ieVersion(state: SystemState) {
      const { userAgent } = navigator; // 取得浏览器的userAgent字符串
      const isIE =
        userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
      const isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
      const isIE11 =
        userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;

      if (isIE)
        // eslint-disable-next-line no-alert
        alert('您的浏览器版本为IE11以下，不被本网站支持，请您更换浏览器！');
      if (isEdge) state.Edge = true; // edge
      if (isIE11) state.IEVersion = 11; // IE11
    },

    /**
     * 设置系统OS版本
     *
     * @param state state
     * @param version 系统OS版本
     */
    version(state: SystemState, version: string) {
      state.OSVersion = version;
    }
  },
  actions: {
    systemInfo(context: ActionContext<SystemState, BaseState>) {
      const userAgent = navigator.userAgent.toLowerCase();
      let version = '';

      if (userAgent.indexOf('like mac os x') > 0) {
        context.commit('iOS');

        const reg = /os [\d._]+/giu;
        const vInfo = userAgent.match(reg);

        if (vInfo)
          version = vInfo[0].replace(/[^0-9|_.]/giu, '').replace(/_/giu, '.');
      } else if (userAgent.indexOf('android') > 0) {
        context.commit('android');

        const reg = /android [\d._]+/giu;
        const vInfo = userAgent.match(reg);

        if (vInfo)
          version = vInfo[0].replace(/[^0-9|_.]/giu, '').replace(/_/giu, '.');
      } else context.commit('ieVersion'); // IE检测

      // 提交系统版本
      context.commit('version', version);
    }
  }
};
