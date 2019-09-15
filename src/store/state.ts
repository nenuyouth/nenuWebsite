/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: state文件
 * @Date: 2019-03-24 00:00:21
 * @LastEditTime: 2019-03-25 00:55:34
 */

/** 基础状态 */
export interface BaseState {
  /** 内部文档列表 */
  compiledDoc: Record<string, string>;
  /** 东师指南列表 */
  compiledGuide: Record<string, string>;
  /** 文档加载状态 */
  docLoading: boolean;
  /** 登录状态 */
  loginStatus: Record<string, boolean>;
  /** 密码存储 */
  password: Record<string, string>;
  /** 夜间模式开启状态 */
  nightmode: boolean;
  /** 当前路径 */
  path: string;
}

/** 初始状态 */
const myState: BaseState = {
  compiledDoc: {},
  compiledGuide: {},
  docLoading: true,
  loginStatus: {},
  password: {},
  nightmode: false,
  path: ''
};

export default myState;
