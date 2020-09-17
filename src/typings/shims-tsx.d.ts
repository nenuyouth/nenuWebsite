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
    type Element = VNode
    // tslint:disable no-empty-interface
    type ElementClass = Vue
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [elem: string]: any;
    }
  }
}
