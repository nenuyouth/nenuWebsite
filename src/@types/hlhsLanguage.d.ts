/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Highlight.js语言模块声明文件
 * @Date: 2019-05-06 01:58:52
 * @LastEditTime: 2019-05-06 10:57:43
 */

declare module 'highlight.js/lib/languages/*' {
  import { IModeBase, HLJSStatic } from 'highlight.js';

  const language: (hljs?: HLJSStatic) => IModeBase;

  export default language;
}
