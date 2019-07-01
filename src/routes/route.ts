/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 路由配置文件
 * @Date: 2019-03-25 12:27:33
 * @LastEditTime: 2019-06-29 20:07:19
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
    path: '/guide',
    name: 'guide',
    meta: { title: '新生攻略' },
    // 使用import来进行异步调用实现懒加载，打包时，webpack会识别webpackChunkName注释，将相同的一起打包一同执行懒加载
    component: () => import(/* webpackChunkName: "guide" */ '@/views/Guide.vue')
  },
  {
    path: '/page/:path',
    alias: '/guide/:path',
    props: true,
    meta: { title: '东师指南' },
    component: () => import(/* webpackChunkName: "guide" */ '@/views/Page.vue')
  },
  {
    path: '/lecture',
    name: 'lecture',
    meta: { title: '讲座信息' },
    component: () => import(/* webpackChunkName: "tool" */ '@/views/Lecture.vue')
  },
  {
    path: '/lecture/:school',
    name: 'lectureDetail',
    meta: { title: '讲座信息' },
    component: () => import(/* webpackChunkName: "tool" */ '@/views/Lecture.vue')
  },
  {
    path: '/tool/calendar',
    name: 'calendar',
    meta: { title: '东师校历' },
    component: () => import(/* webpackChunkName: "tool" */ '@/views/tools/Calendar.vue')
  },
  {
    path: '/tool/calendar/:time',
    name: 'calendarDetail',
    meta: { title: '校历详情' },
    component: () => import(/* webpackChunkName: "tool" */ '@/views/tools/CalendarDetail.vue')
  },
  {
    path: '/tool/schoolGzh',
    name: 'schoolGzh',
    meta: { title: '学院矩阵' },
    component: () => import(/* webpackChunkName: "tool" */ '@/views/tools/SchoolGzh.vue')
  },
  {
    path: '/tool/NetCharge',
    name: 'NetCharge',
    meta: { title: '网费充值' },
    component: () => import(/* webpackChunkName: "tool" */ '@/views/tools/NetCharge.vue')
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
    path: '/intro/studentUnion',
    name: 'su',
    meta: { title: '校学生会简介' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/SU.vue')
  },
  {
    path: '/intro/department',
    name: 'department',
    meta: { title: '校学生会部门简介' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/Department.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: { title: '关于我们' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/About.vue')
  },
  {
    path: '/about/Mr-Hope',
    name: 'mrhope',
    meta: { title: 'Mr.Hope简介' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/MrHope.vue')
  },
  {
    path: '/about/question',
    name: 'question',
    meta: { title: '其他问题' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/Question.vue')
  },
  {
    path: '*',
    name: '404',
    meta: { title: '未找到界面' },
    component: Page404
  }
];

export default route;
