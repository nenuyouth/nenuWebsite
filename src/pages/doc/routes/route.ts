/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 路由配置文件
 * @Date: 2019-03-25 12:27:33
 * @LastEditTime: 2019-06-21 21:15:01
 */
import Page404 from '@/views/Page404.vue';

const route = [
  { path: '/doc/private/readme', redirect: '/doc' },
  { path: '/doc/private/:path1/readme', redirect: '/doc/:path1' },
  { path: '/doc/private/:path1/:path2/readme', redirect: '/doc/:path1/:path2' },
  { path: '/doc/private/:path1/:path2/:path3/readme', redirect: '/doc/:path1/:path2/:path3' },
  {
    path: '/doc/private/:path1?/:path2?/:path3?/:path4?',
    meta: { title: false },
    component: () => import('../views/InternalDoc.vue')
  },
  { path: '/doc/readme', redirect: '/doc' },
  { path: '/doc/:path1/readme', redirect: '/doc/:path1' },
  { path: '/doc/:path1/:path2/readme', redirect: '/doc/:path1/:path2' },
  { path: '/doc/:path1/:path2/:path3/readme', redirect: '/doc/:path1/:path2/:path3' },
  {
    path: '/doc/:path1?/:path2?/:path3?/:path4?',
    meta: { title: false },
    component: () => import('../views/Guide.vue')
  },
  {
    path: '*',
    name: '404',
    meta: { title: '未找到界面' },
    component: Page404
  }
];

export default route;
