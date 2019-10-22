/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Mavon Editor声明文件
 * @Date: 2019-03-25 12:39:59
 * @LastEditTime: 2019-06-13 21:15:09
 */

declare module 'mavon-editor' {
  import { Component } from "vue";

  export let mavonEditor: Component;

  interface VueMavonEditor {
    markdownIt: any;
    mavonEditor: Component;
    LeftToolbar: Component;
    RightToolbar: Component;
    install: (Vue: any) => any;
  }

  export default VueMavonEditor;
}
