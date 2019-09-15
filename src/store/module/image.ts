/*
 * @Author: Mr.Hope
 * @Date: 2019-06-26 20:26:14
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-15 15:43:58
 * @Description: Vuex ImagePreview Module
 */

import { Module } from 'vuex';
import { BaseState } from '../state';

export interface ImageState {
  /** 图片的展示状态 */
  display: boolean;
  /** 图片列表 */
  list: string[];
  /** 当前展示图片的索引 */
  index: number;
}

/** 图片基础状态 */
const imageState: ImageState = {
  display: false,
  list: [],
  index: 0
};

const imageModule: Module<ImageState, BaseState> = {
  state: imageState,
  mutations: {
    /**
     * @description: 设置是否展示
     *
     * @param state imagestate
     * @param status 展示状态
     */
    displayImage(state: ImageState, status?: boolean) {
      if (!status) state.display = !state.display;
      else if (status !== state.display) state.display = status;
    },

    /**
     * @description: 设置所展示图片的索引值
     *
     * @param state imagestate
     * @param index 所展示图片的索引
     */
    imageIndex(state: ImageState, index: number) {
      state.index = index;
    },

    /**
     * @description: 设置图片列表
     *
     * @param state imagestate
     * @param urls 图片地址
     * @param index 所展示图片的索引
     */
    imageList(state: ImageState, urls?: string | string[], index?: number) {
      state.list = urls ? typeof urls === 'string' ? [urls] : urls : [''];
      if (index) state.index = index;
    },


    /**
     * @description: 通过图片地址设置所展示图片的索引值
     *
     * @param state imagestate
     * @param url 所展示图片的地址
     * @param only 是否仅展示本图片
     */
    imageUrl(state: ImageState, url: string, only?: boolean) {
      if (only) {
        state.list = [url];
        state.index = 0;
      } else state.index = state.list.indexOf(url);
      state.display = true;
    }
  }
};

export default imageModule;
