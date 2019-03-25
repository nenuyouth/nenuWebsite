
/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 判断浏览器环境
 * @Date: 2019-03-19 14:14:22
 * @LastEditTime: 2019-03-19 14:38:37
 */
import { Store } from 'vuex';

interface VersionInfo {
  iOS: boolean;
  Android: boolean;
  version: string;
}

/**
 * @description: 获取iOS版本
 * @param store Vuex Store
 * @returns: 版本号
 */
const getVersion = (store: Store<any>) => {
  const ua = navigator.userAgent.toLowerCase();
  let version = '';

  if (ua.indexOf('like mac os x') > 0) {
    const reg = /os [\d._]+/ugi;
    const vInfo = ua.match(reg);

    if (vInfo) version = vInfo[0].replace(/[^0-9|_.]/uig, '').replace(/_/uig, '.'); // 得到版本号9.3.2或者9.0
    store.commit('iOS');

  } else if (ua.indexOf('android') > 0) {
    const reg = /android [\d._]+/ugi;
    const vInfo = ua.match(reg);

    if (vInfo) version = vInfo[0].replace(/[^0-9|_.]/uig, '').replace(/_/uig, '.'); // 得到版本号4.2.2
    store.commit('android');

  }

  store.commit('version', version);
};

export default getVersion;
