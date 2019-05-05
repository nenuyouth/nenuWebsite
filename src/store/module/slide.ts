/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Vuex Slide Module
 * @Date: 2019-03-24 23:50:48
 * @LastEditTime: 2019-03-25 10:10:26
 */
import { Module } from 'vuex';
import { BaseState } from '../state';

export interface MenuItem {
  key: string;
  title: string;
  icon?: boolean | string;
  children?: MenuItem;
}

export interface SlideState {
  icon: string;
  title: string;
  list: MenuItem[];
}

const slideState: SlideState = {
  icon: '',
  title: '',
  list: []
};

const slideModule: Module<SlideState, BaseState> = {
  state: slideState,
  mutations: {

    /**
     * @description: 设置Slide菜单内容
     *
     * @param state state
     * @param menuContent Slide菜单内容
     */
    menuList(state: SlideState, menuContent: MenuItem[]) {
      state.list = menuContent;
      if (menuContent.length === 0) {
        state.title = '';
        state.icon = '';
      }
    },

    /**
     * @description: 设置Slide菜单标题
     *
     * @param state state
     * @param title Slide标题内容
     */
    menuTitle(state: SlideState, title: string) {
      state.title = title;
    },

    /**
     * @description: 设置Slide菜单图标
     *
     * @param state state
     * @param icon Slide图标内容
     */
    menuIcon(state: SlideState, icon: string) {
      state.icon = icon;
    }
  }
};

export default slideModule;
