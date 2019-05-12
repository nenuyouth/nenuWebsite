/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Vuex ImagePreview Module
 * @Date: 2019-03-24 23:50:48
 * @LastEditTime: 2019-03-25 10:10:26
 */
import { ActionContext, Module } from 'vuex';
import { BaseState } from '../state';

export interface SystemState {
  iOS: boolean;
  Android: boolean;
  Edge: boolean;
  IE: boolean;
  IEVersion: number;
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

const systemModule: Module<SystemState, BaseState> = {
  state: systemState,
  mutations: {
    /**
     * @description: 设置终端为安卓
     *
     * @param state state
     */
    android(state: SystemState) {
      state.Android = true;
    },

    /**
     * @description: 设置终端为iOS
     *
     * @param state state
     */
    iOS(state: SystemState) {
      state.iOS = true;
    },
    ieVersion(state: SystemState) {
      const { userAgent } = navigator; // 取得浏览器的userAgent字符串
      const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
      const isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
      const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;

      if (isIE) {
        const reIE = new RegExp('MSIE (\\d+\\.\\d+);');

        state.IE = true;
        reIE.test(userAgent);
        const IEVersion = parseFloat(RegExp.$1);

        state.IEVersion = IEVersion || 6;
      }

      if (isEdge) state.Edge = true;// edge
      if (isIE11) state.IEVersion = 11; // IE11
    },

    /**
     * @description: 设置系统OS版本
     *
     * @param state state
     * @param version 系统OS版本
     */
    version(state: SystemState, version: string) {
      state.OSVersion = version;
    }
  },
  actions: {
    systemInfo(context: (ActionContext<SystemState, BaseState>)) {
      const userAgent = navigator.userAgent.toLowerCase();
      let version = '';

      if (userAgent.indexOf('like mac os x') > 0) {
        context.commit('iOS');

        const reg = /os [\d._]+/ugi;
        const vInfo = userAgent.match(reg);

        if (vInfo) version = vInfo[0].replace(/[^0-9|_.]/uig, '').replace(/_/uig, '.');

      } else if (userAgent.indexOf('android') > 0) {
        context.commit('android');

        const reg = /android [\d._]+/ugi;
        const vInfo = userAgent.match(reg);

        if (vInfo) version = vInfo[0].replace(/[^0-9|_.]/uig, '').replace(/_/uig, '.');
      } else
        context.commit('ieVersion'); // IE检测

      // 提交系统版本
      context.commit('version', version);
    }
  }
};

export default systemModule;
