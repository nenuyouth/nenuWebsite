<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 主视图文件
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-03-23 18:23:42
 -->
<template>
  <a-layout hasSider="true" id="app">
    <my-slide v-if="$store.state.menuList.length"></my-slide>
    <a-layout id="body">
      <my-nav></my-nav>
      <transition :name="transitionName">
        <keep-alive :max="10">
          <router-view v-wechat-title="$route.meta.title"/>
        </keep-alive>
      </transition>
      <back-top/>
      <my-footer/>
    </a-layout>
  </a-layout>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import BackTop from '@/components/BackTop.vue';
import MyNav from '@/components/Nav.vue';
import MySlide from '@/components/Slide.vue';
import MyFooter from '@/components/Footer.vue';

@Component({ components: { BackTop, MyNav, MyFooter, MySlide } })
export default class App extends Vue {
  // 动画名称
  private transitionName = 'slide-right';

  @Watch('$route')
  private onRouteChange(to: Route, from: Route) {
    const remove = (array: string[], value: string) => {
      for (let i = 0; i < array.length; i += 1)
        if (array[i] === value) {
          array.splice(i, 1);
          i -= 1;
        }

      return array;
    };
    const toDepth = remove(to.path.split('/'), '').length;
    const fromDepth = remove(from.path.split('/'), '').length;

    // 改变动画效果
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
  }
}
</script>
<style>
/* App.vue主布局 */
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 内容主布局 */
#body {
  background-color: #fff;
}
/* 侧边栏展开效果优化 */
@media (max-width: 992px) {
  #body {
    width: 100vw;
    flex: none;
  }
}
@media (min-width: 992px) {
  #body {
    padding-top: 48px;
  }
}
/* #body::-webkit-scrollbar {
  display: none;
} */

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s;
  background-color: #fff;
}
.slide-left-leave-active,
.slide-right-leave-active {
  position: relative;
}
.slide-left-enter-active,
.slide-right-enter-active {
  position: absolute;
  top: 3rem;
}
.slide-left-leave-active,
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-left-enter,
.slide-right-leave-active {
  transform: translateX(100%);
}
</style>
