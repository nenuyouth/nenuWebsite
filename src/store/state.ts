/*
* @Author: Mr.Hope
 * @LastEditors: Mr.Hope
* @Description: state文件
* @Date: 2019-03-24 00:00:21
 * @LastEditTime: 2019-03-25 00:55:34
*/
import { ScreenState } from './screen';

interface DocList {
  [propName: string]: string;
}

export interface MenuList {
  key: string;
  title: string;
  children?: MenuList;
}

export interface BaseState {
  Android: boolean;
  iOS: boolean;
  OSVersion: string;
  compiledMarkdown: DocList;
  docLoading: boolean;
  internalLogin: boolean;
  internalPassword: string;
  menuList: MenuList[];
  nightmode: boolean;
  path: string;

  // screen?: ScreenState;
}

const myState: BaseState = {
  Android: false,
  iOS: false,
  OSVersion: '',
  compiledMarkdown: {},
  docLoading: true,
  internalLogin: false,
  internalPassword: '',
  menuList: [],
  nightmode: false,
  path: ''
};

export default myState;
