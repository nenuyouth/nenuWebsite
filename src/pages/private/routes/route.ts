/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 路由配置文件
 * @Date: 2019-03-25 12:27:33
 * @LastEditTime: 2019-06-03 13:01:51
 */
import Main from '@/pages/private/views/Main.vue';
import Page404 from '@/views/Page404.vue';

const route = [
  {
    path: '/private',
    meta: { title: '内部管理' },
    component: Main
  },
  {
    path: '/private/jsonEditor',
    meta: { title: 'JSON编辑器' },
    component: () => import(/* webpackChunkName: "test" */ '../views/JsonEditor.vue')
  },
  {
    path: '/private/mdEditor',
    meta: { title: 'Markdown编辑器' },
    component: () => import(/* webpackChunkName: "test" */ '../views/MarkdownEditor.vue')
  },
  {
    path: '/private/test',
    meta: { title: 'JSON编辑器测试' },
    component: () => import(/* webpackChunkName: "test" */ '../views/FormTest.vue')
  },
  {
    path: '*',
    name: '404',
    meta: { title: '未找到界面' },
    component: Page404
  }
];

export default route;
