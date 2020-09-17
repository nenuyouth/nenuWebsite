<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 主视图文件
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-11-07 15:55:10
-->
<template>
  <a-layout id="app" has-sider="true">
    <my-slide v-if="$store.state.slide.list.length" id="aside" />
    <a-layout id="body">
      <my-nav id="nav" />
      <!-- <transition :name="transitionName"> -->
      <a-layout-content id="content">
        <keep-alive :max="10">
          <router-view v-if="$route.meta.title === false" />
          <router-view
            v-else
            v-wechat-title="$route.meta.title || '东北师范大学学生会'"
          />
        </keep-alive>
      </a-layout-content>
      <!-- </transition> -->
      <back-top />
      <my-footer id="footer" />
    </a-layout>
    <base-viewer />
  </a-layout>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import BackTop from "#/BackTop.vue";
import BaseViewer from "#/BaseViewer.vue";
import MyFooter from "#/Footer.vue";
import MyNav from "#/Nav.vue";
import MySlide from "#/Slide.vue";
import { Route } from "vue-router";

@Component({ components: { BackTop, BaseViewer, MyNav, MyFooter, MySlide } })
export default class App extends Vue {
  /** 动画名称 */
  private transitionName = "slide-right";

  /** 改变动画效果 */
  @Watch("$route")
  private onRouteChange(to: Route, from: Route) {
    const remove = (array: string[], value: string) => {
      for (let i = 0; i < array.length; i += 1)
        if (array[i] === value) {
          array.splice(i, 1);
          i -= 1;
        }

      return array;
    };
    const toDepth = remove(to.path.split("/"), "").length;
    const fromDepth = remove(from.path.split("/"), "").length;

    // 改变动画效果
    this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
  }
}
</script>
<style lang="scss">
/* App.vue主布局 */
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // 保证lg以上屏幕footer的固定效果
  @media (min-width: 992px) {
    background-color: #fff;
    margin-bottom: 192px;
  }
}

// lg以上屏幕nav固定
#body {
  @media (min-width: 992px) {
    padding-top: 48px;
  }
  @media (max-width: 992px) {
    padding-top: 40px;
  }
}

/* 内容主布局 */
#content {
  /* 背景色配色 */
  background-color: #fff;
  /* 防止内部元素无法撑开content */
  min-height: auto;
  /* 侧边栏展开显示配合 */
  @media (max-width: 992px) {
    width: 100vw;
  }
}

@mixin slide {
  transition: all 0.5s;
  background-color: #fff;
}
.slide-left-leave-active,
.slide-right-leave-active {
  @include slide;
  position: relative;
}
.slide-left-enter-active,
.slide-right-enter-active {
  @include slide;
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
