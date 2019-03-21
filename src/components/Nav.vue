<template>
  <a-menu mode="horizontal" v-model="active">
    <a-menu-item key="logo" style="padding:0 0 0 20px;">
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
      <span class="submenu-title-wrapper" slot="title">
        <a-icon type="camera"/>东师风貌
      </span>
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component
export default class Nav extends Vue {
  private active = ['home'];

  private mounted() {
    this.active = [this.$route.path];
  }

  // TODO:添加route监听，设置对应激活效果
  @Watch('$route')
  private routeChange(to: Route) {
    if (to.path) this.active = [to.path];
  }
}
</script>
