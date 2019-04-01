/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 路由配置文件
 * @Date: 2019-03-25 12:27:33
 * @LastEditTime: 2019-04-01 12:34:10
 */
import Main from '@/views/Main.vue';
import Page404 from '@/views/Page404.vue';

const myRoute = [
  {
    path: '/',
    name: 'main',
    meta: { title: '东北师范大学学生会' },
    component: Main
  },
  {
    path: '/guide',
    name: 'guide',
    meta: { title: '东师指南' },

    // 使用import来进行异步调用实现懒加载，打包时，webpack会识别webpackChunkName注释，将相同的一起打包一同执行懒加载
    component: () => import(/* webpackChunkName: "guide" */ '@/views/Guide.vue')
  },
  {
    path: '/page/:path',
    alias: '/guide/:path',
    props: true,
    meta: { title: '东师指南' },
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page.vue')
  },
  { path: '/doc/readme', redirect: '/doc' },
  { path: '/doc/:path1/readme', redirect: '/doc/:path1' },
  { path: '/doc/:path1/:path2/readme', redirect: '/doc/:path1/:path2' },
  { path: '/doc/:path1/:path2/:path3/readme', redirect: '/doc/:path1/:path2/:path3' },
  {
    path: '/doc/:path1?/:path2?/:path3?/:path4?',
    meta: { title: '内部文档' },
    component: () => import(/* webpackChunkName: "doc" */ '@/views/Doc.vue')
  },
  {
    path: '/tool/calendar',
    name: 'calendar',
    meta: { title: '东师校历' },
    component: () => import(/* webpackChunkName: "calendar" */ '@/views/tool/Calendar.vue')
  },
  {
    path: '/tool/calendar/2019spring',
    name: 'calendar',
    meta: { title: '东师校历' },
    component: () => import(/* webpackChunkName: "calendar" */ '@/views/tool/Calendar/2019spring.vue')
  },
  {
    path: '/tool/schoolGzh',
    name: 'schoolGzh',
    meta: { title: '学院矩阵' },
    component: () => import(/* webpackChunkName: "tool" */ '@/views/tool/SchoolGzh.vue')
  },
  {
    path: '/tool/NetCharge',
    name: 'NetCharge',
    meta: { title: '网费充值' },
    component: () => import(/* webpackChunkName: "tool" */ '@/views/tool/NetCharge.vue')
  },
  {
    path: '/scence',
    name: 'scence',
    component: () => import(/* webpackChunkName: "scence" */ '@/views/scence/Scence.vue')
  },
  {
    path: '/scence/benbu',
    name: 'benbuScence',
    component: () => import(/* webpackChunkName: "scence" */ '@/views/scence/Benbu.vue')
  },
  {
    path: '/scence/jingyue',
    name: 'jingyueScence',
    component: () => import(/* webpackChunkName: "scence" */ '@/views/scence/Jingyue.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/About.vue')
  },
  {
    path: '/about/intro',
    name: 'intro',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/Intro.vue')
  },
  {
    path: '/about/mrhope',
    name: 'mrhope',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/MrHope.vue')
  },
  {
    path: '/about/coperation',
    name: 'coperation',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/Coperation.vue')
  },
  {
    path: '/about/media',
    name: 'media',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/Media.vue')
  },
  {
    path: '/about/qq',
    name: 'qq',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/QQ.vue')
  },
  {
    path: '/about/douyin',
    name: 'douyin',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/Douyin.vue')
  },
  {
    path: '/about/wechat',
    name: 'wechat',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/Wechat.vue')
  },
  {
    path: '/about/question',
    name: 'question',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/Question.vue')
  },
  {
    path: '*',
    name: '404',
    meta: { title: '未找到界面' },
    component: Page404
  }
];

export default myRoute;
