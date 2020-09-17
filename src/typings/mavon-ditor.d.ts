/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Mavon Editor声明文件
 * @Date: 2019-03-25 12:39:59
 * @LastEditTime: 2019-06-13 21:15:09
 */

declare module "mavon-editor" {
  import { Component } from "vue";

  export let mavonEditor: Component;

  interface VueMavonEditor {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    markdownIt: any;
    mavonEditor: Component;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    LeftToolbar: Component;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    RightToolbar: Component;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    install: (Vue: any) => any;
  }

  export default VueMavonEditor;
}
