/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: store配置文件
 * @Date: 2019-02-24 22:21:25
 * @LastEditTime: 2019-03-07 13:14:57
 */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);// 使用Vuex

interface DocList {
  [propName: string]: string;
}

export interface State {
  compiledMarkdown: DocList;
  docLoading: boolean;
  internalLogin: boolean;
}

const myState: State = {
  compiledMarkdown: {},
  docLoading: true,
  internalLogin: false
};

export default new Vuex.Store({
  state: myState,
  mutations: {
    compiledMarkdown(state: State, compiledMarkdown: string[]) {
      Vue.set(state.compiledMarkdown, compiledMarkdown[0], compiledMarkdown[1]);
    },
    docLoading(state: State, docLoading: boolean) {
      state.docLoading = docLoading;
    },
    internalLogin(state: State) {
      state.internalLogin = true;
    }

  },
  actions: {}
});
