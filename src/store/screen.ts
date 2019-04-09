/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Vuex Screen Module
 * @Date: 2019-03-24 23:50:48
 * @LastEditTime: 2019-03-25 10:10:26
 */
import { ActionContext, Module } from 'vuex';
import { BaseState } from './state';

export interface ScreenState {
  [propName: string]: string | number | boolean;
  width: number;
  status: string;
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;
}

const screenState: ScreenState = {
  width: 0,
  status: '',
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
  xxl: false
};

const screenModule: Module<ScreenState, BaseState> = {
  state: screenState,
  mutations: {
    changeScreen(state: ScreenState, width: number) {
      let status;

      // judge scrren status
      if (width > 1200) status = width < 1600 ? 'xl' : 'xxl';
      else if (width < 768) status = width < 576 ? 'xs' : 'sm';
      else status = width < 992 ? 'md' : 'lg';

      // if new status, then handle state detail
      if (state.status !== status) {
        const hash = ['sm', 'md', 'lg', 'xl', 'xxl'];

        state.status = status;

        if (status === 'xs') { // make xs 'true' and the rest 'false'
          if (!state.xs) state.xs = true;
          hash.forEach(x => {
            if (state[x]) state[x] = false;
          });
        } else { // mark xs false

          if (state.xs) state.xs = false;

          let index = hash.indexOf(status);
          let index2 = hash.length - 1;

          // change the elments after 'status' false
          while (index2 > index) {
            if (state[hash[index2]]) state[hash[index2]] = false;
            index2 -= 1;

          }
          // change the elments before 'status' true
          while (index + 1) {
            if (!state[hash[index]]) state[hash[index]] = true;
            index -= 1;
          }
        }
      }
    },
    screenWidth(state: ScreenState, width: number) {
      state.width = width;
    }
  },
  actions: {
    screen(context: (ActionContext<ScreenState, BaseState>), width: number) {
      context.commit('screenWidth', width);
      context.commit('changeScreen', width);
    }
  }
};

export default screenModule;
