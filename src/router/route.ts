/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 路由配置文件
 * @Date: 2019-03-25 12:27:33
 * @LastEditTime: 2019-05-05 15:55:21
 */
import Main from '@/views/Main.vue';
import Page404 from '@/views/Page404.vue';

const route = [
  {
    path: '/',
    alias: '/index.html',
    name: 'main',
    component: Main
  },
  {
    path: '/handbook',
    name: 'handbook',
    meta: { title: '东师攻略' },
    // 使用import来进行异步调用实现懒加载，打包时，webpack会识别webpackChunkName注释，将相同的一起打包一同执行懒加载
    component: () => import(/* webpackChunkName: "handbook" */ '@/views/Handbook.vue')
  },
  {
    path: '/page/:path',
    alias: '/handbook/:path',
    props: true,
    meta: { title: '东师指南' },
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page.vue')
  },
  {
    path: '/tool/calendar',
    name: 'calendar',
    meta: { title: '东师校历' },
    component: () => import(/* webpackChunkName: "calendar" */ '@/views/tool/Calendar.vue')
  },
  {
    path: '/tool/calendar/:time',
    name: 'calendarDetail',
    meta: { title: '校历详情' },
    component: () => import(/* webpackChunkName: "calendar" */ '@/views/tool/CalendarDetail.vue')
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
    meta: { title: '东师风貌' },
    component: () => import(/* webpackChunkName: "scence" */ '@/views/scence/Scence.vue')
  },
  {
    path: '/scence/benbu',
    name: 'benbuScence',
    meta: { title: '本部风貌' },
    component: () => import(/* webpackChunkName: "scence" */ '@/views/scence/Benbu.vue')
  },
  {
    path: '/scence/jingyue',
    name: 'jingyueScence',
    meta: { title: '净月风貌' },
    component: () => import(/* webpackChunkName: "scence" */ '@/views/scence/Jingyue.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: { title: '关于我们' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/About.vue')
  },
  {
    path: '/about/intro',
    name: 'intro',
    meta: { title: '校学生会简介' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/Intro.vue')
  },
  {
    path: '/about/mrhope',
    name: 'mrhope',
    meta: { title: 'Mr.Hope简介' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/MrHope.vue')
  },
  {
    path: '/about/coperation',
    name: 'coperation',
    meta: { title: '项目合作' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/Coperation.vue')
  },
  {
    path: '/about/media',
    name: 'media',
    meta: { title: '其他媒体' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/Media.vue')
  },
  {
    path: '/about/qq',
    name: 'qq',
    meta: { title: 'QQ' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/QQ.vue')
  },
  {
    path: '/about/douyin',
    name: 'douyin',
    meta: { title: '抖音' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/Douyin.vue')
  },
  {
    path: '/about/wechat',
    name: 'wechat',
    meta: { title: '微信' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/Wechat.vue')
  },
  {
    path: '/about/question',
    name: 'question',
    meta: { title: '其他问题' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/Question.vue')
  },
  { path: '/guide/readme', redirect: '/guide' },
  { path: '/guide/:path1/readme', redirect: '/guide/:path1' },
  { path: '/guide/:path1/:path2/readme', redirect: '/guide/:path1/:path2' },
  { path: '/guide/:path1/:path2/:path3/readme', redirect: '/guide/:path1/:path2/:path3' },
  {
    path: '/guide/:path1?/:path2?/:path3?/:path4?',
    meta: { title: false },
    component: () => import(/* webpackChunkName: "guide" */ '@/views/Guide.vue')
  },
  { path: '/doc/readme', redirect: '/doc' },
  { path: '/doc/:path1/readme', redirect: '/doc/:path1' },
  { path: '/doc/:path1/:path2/readme', redirect: '/doc/:path1/:path2' },
  { path: '/doc/:path1/:path2/:path3/readme', redirect: '/doc/:path1/:path2/:path3' },
  {
    path: '/doc/:path1?/:path2?/:path3?/:path4?',
    meta: { title: false },
    component: () => import(/* webpackChunkName: "doc" */ '@/views/Doc.vue')
  },
  {
    path: '*',
    name: '404',
    meta: { title: '未找到界面' },
    component: Page404
  }
];

export default route;
