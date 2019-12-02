/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: tsx声明文件
 * @Date: 2019-03-25 12:40:00
 * @LastEditTime: 2019-03-28 15:43:05
 */

import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
