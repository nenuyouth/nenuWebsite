/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Vuex ImagePreview Module
 * @Date: 2019-03-24 23:50:48
 * @LastEditTime: 2019-03-25 10:10:26
 */
import { ActionContext, Module } from 'vuex';
import { BaseState } from './state';

export interface ImageState {
  [propName: string]: string | string[] | number;
  imageList: string[];
  index: number;
}

const imageState: ImageState = {
  imageList: [],
  index: 0
};

const imageModule: Module<ImageState, BaseState> = {
  state: imageState,
  mutations: {
    /**
     * @description: 设置图片列表
     *
     * @param state imagestate
     * @param urls 图片地址
     * @param index 所展示图片的索引
     */
    setList(state: ImageState, urls?: string | string[], index?: number) {
      state.imageList = urls ? typeof urls === 'string' ? [urls] : urls : [''];
      if (index) state.index = index;
    },
    /**
     * @description: 设置所展示图片的索引值
     *
     * @param state imagestate
     * @param index 所展示图片的索引
     */
    index(state: ImageState, index: number) {
      state.index = index;
    }
  },
  actions: {
  }
};

export default imageModule;
