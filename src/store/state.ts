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

export interface MenuList {
  key: string;
  title: string;
  children?: MenuList;
}

export interface BaseState {
  compiledDoc: DocList;
  compiledGuide: DocList;
  docLoading: boolean;
  internalLogin: boolean;
  internalPassword: string;
  menuList: MenuList[];
  nightmode: boolean;
  path: string;
}

const myState: BaseState = {
  compiledDoc: {},
  compiledGuide: {},
  docLoading: true,
  internalLogin: false,
  internalPassword: '',
  menuList: [],
  nightmode: false,
  path: ''
};

export default myState;
