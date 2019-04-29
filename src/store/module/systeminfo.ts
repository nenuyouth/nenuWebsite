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
  OSVersion: string;
}

const systemState: SystemState = {
  iOS: false,
  Android: false,
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
      }

      // 提交系统版本
      context.commit('version', version);
    }
  }
};

export default systemModule;
