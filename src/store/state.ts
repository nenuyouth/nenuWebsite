/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: state文件
 * @Date: 2019-03-24 00:00:21
 * @LastEditTime: 2019-03-25 00:55:34
 */

interface DocList {
  [propName: string]: string;
}

interface LoginStatus{
  [propName: string]: boolean;
}

interface Password {
  [propName: string]: string;
}

export interface BaseState {
  compiledDoc: DocList;
  compiledGuide: DocList;
  docLoading: boolean;
  loginStatus: LoginStatus;
  password: Password;
  nightmode: boolean;
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
