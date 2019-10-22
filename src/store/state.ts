/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: state文件
 * @Date: 2019-03-24 00:00:21
 * @LastEditTime: 2019-03-25 00:55:34
 */

/** 基础状态 */
export interface BaseState extends Record<string, any> {
  /** 环境变量 */
  env: Record<string, any>;
  /** 夜间模式开启状态 */
  nightmode: boolean;
  /** 当前路径 */
  path: string;
}

/** 初始状态 */
const myState: BaseState = {
  env: {},
  nightmode: false,
  path: ''
};

export default myState;
