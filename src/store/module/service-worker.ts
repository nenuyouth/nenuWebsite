/*
 * @Author: Mr.Hope
 * @Date: 2019-05-16 15:35:49
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-15 15:48:18
 * @Description: Vuex ServiceWorker Module
 */

import { Module } from 'vuex';
import { BaseState } from '../state';

/** ServiceWorker状态 */
export interface SWState {
  /** ServiceWorker 当前状态 */
  status: string;
  /** ServiceWorker错误 */
  error?: any;
}

const swState: SWState = { status: '' };

const swModule: Module<SWState, BaseState> = {
  state: swState,
  mutations: {
    /**
     * 设置ServiceWorker状态
     *
     * @param state swState
     * @param status ServiceWorker状态
     */
    setList(state: SWState, status: string) {
      state.status = status;
    },

    /**
     * 设置ServiceWorker错误
     *
     * @param state imagestate
     * @param error 遇到的错误
     */
    index(state: SWState, error: any) {
      state.status = 'error';
      state.error = error;
    }
  }
};

export default swModule;
