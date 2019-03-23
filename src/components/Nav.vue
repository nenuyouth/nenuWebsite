<template>
  <a-menu :theme="theme" mode="horizontal" v-model="active">
    <a-menu-item disabled key="logo" style="padding:0 0 0 20px;">
      <router-link to="/">
        <img
          alt="东师青年"
          class="d-inline-block mr-2"
          src="/img/icon/nenuyouth.png"
          style="width:18.4px;height:18.4px;"
        >
        <span class="d-none d-lg-inline text-black">东北师范大学学生会&ensp;&ensp;</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="/">
      <router-link to="/">
        <a-icon type="home"/>主页
      </router-link>
    </a-menu-item>
    <a-menu-item key="/guide">
      <router-link to="/guide">
        <a-icon type="bulb"/>东师指南
      </router-link>
    </a-menu-item>
    <a-sub-menu>
      <template v-slot:title>
        <span class="submenu-title-wrapper">
          <a-icon type="camera"/>东师风貌
        </span>
      </template>
      <a-menu-item key="scence:1">本部校区</a-menu-item>
      <a-menu-item key="scence:2">净月校区</a-menu-item>
    </a-sub-menu>
    <a-menu-item key="/about">
      <router-link to="/about">
        <a-icon type="fire"/>深入了解
      </router-link>
    </a-menu-item>
    <a-menu-item key="/about/question">
      <router-link to="/about/question">
        <a-icon type="question"/>疑难解答
      </router-link>
    </a-menu-item>
  </a-menu>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component
export default class Nav extends Vue {
  private active = [''];

  // 主题计算
  private get theme() {
    return this.$store.state.nightmode ? 'dark' : 'light';
  }

  // 挂载时激活对应menu项
  private mounted() {
    this.active = [this.$route.path];
  }

  // 监听路径改变，激活对应menu
  @Watch('$route')
  private onRouteChange(to: Route) {
    this.active = [to.path];
  }
}
</script>
<style scoped>
@media (max-width: 992px) {
  .ant-menu-horizontal {
    line-height: 38.6px;
  }
}
@media (min-width: 992px) {
  .ant-menu-horizontal {
    position: fixed;
    width: 100vw;
    top: 0px;
    z-index: 1000;
  }
}
</style>
