/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: serviceWorker配置
 * @Date: 2019-05-02 14:20:56
 * @LastEditTime: 2019-05-02 14:26:07
 */
workbox.core.setCacheNameDetails({ prefix: 'website' });

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
