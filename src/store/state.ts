/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: state文件
 * @Date: 2019-03-24 00:00:21
 * @LastEditTime: 2019-03-24 00:49:13
 */

interface DocList {
  [propName: string]: string;
}
export interface MenuList {
  key: string;
  title: string;
  children?: MenuList;
}

interface ScreenDescription {
  [propName: string]: boolean;
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;
}

export interface State {
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
  screenDesc: ScreenDescription;
  screenStatus: string;
  screenWidth: number;
}

const myState: State = {
  Android: false,
  iOS: false,
  OSVersion: '',
  compiledMarkdown: {},
  docLoading: true,
  internalLogin: false,
  internalPassword: '',
  menuList: [],
  nightmode: false,
  path: '',
  screenDesc: { xs: false, sm: false, md: false, lg: false, xl: true, xxl: false },
  screenStatus: 'xl',
  screenWidth: 1440
};

export default myState;
