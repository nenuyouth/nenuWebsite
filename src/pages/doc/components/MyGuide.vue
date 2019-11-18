<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Markdown显示组件
 * @Date: 2019-02-26 23:43:23
 * @LastEditTime: 2019-11-07 16:16:18
-->
<template>
  <!-- 标题设置 -->
  <div v-wechat-title="docTitle" class="w-100">
    <!-- 面包屑导航 -->
    <div class="container mt-2">
      <!-- 返回按钮 -->
      <span class="backIcon" @click="$router.back()">
        <back type="icon-back" />&ensp;back&ensp;
      </span>|
      <a-breadcrumb style="display:inline-block">
        <a-breadcrumb-item>
          <router-link v-if="routes.length" :to="basepath" class="homeIcon">
            &ensp;
            <a-icon style="font-size:16px;" type="home" />&ensp;home
          </router-link>
          <a-icon v-else type="home" />
        </a-breadcrumb-item>
        <a-breadcrumb-item v-for="(route,index) in routes" :key="route">
          <template v-if="index===routes.length-1">{{route}}</template>
          <router-link v-else :to="`${basepath}/${routes.slice(0,index+1).join('/')}`">{{route}}</router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <!-- <transition :name="transitionName" mode="in-out"> -->
    <keep-alive>
      <!-- 文档显示 -->
      <doc-view :key="path" :doc-content="compiledMarkdown" @title="docTitle=$event" />
    </keep-alive>
    <!-- </transition> -->
  </div>
</template>

<script lang="ts">

// 导入css样式
import '../utils/github-markdown.css';
import 'highlight.js/styles/atom-one-dark.css';

import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Back from '|/icon/backSimple.svg';
import DocView from './DocView.vue';
import { Route } from 'vue-router';
import getCompiledMarkdown from '../utils/getMarkdown';


@Component({ components: { Back, DocView } })
export default class MyGuide extends Vue {
  // 文档标题
  private docTitle = '东师指南';

  // Markdown编译内容
  private compiledMarkdown = '';

  // 动画状态
  private transitionName = 'slide-left';

  // MarkDown基准路径字符数
  @Prop(Number) private readonly baselength!: number;

  private get basepath() {
    return this.$route.path.slice(0, this.baselength - 1);
  }

  private get path() {
    return this.$route.path.slice(this.baselength) || 'readme';
  }

  private get routes() {
    return this.$route.path.slice(this.baselength).split('/');
  }

  private async mounted() {
    // 如果该路径markdown未被缓存则获取之
    if (!this.$store.state.compiledGuide[this.path])
      await getCompiledMarkdown('/server/guide', { path: this.path || 'readme' }, this, 'compiledGuide');

    // 写入编译后的html
    this.compiledMarkdown = this.$store.state.compiledGuide[this.path];
  }

  @Watch('path')
  private onPathChange() {
    // 当路径改变时写入编译后的html
    this.compiledMarkdown = this.$store.state.compiledGuide[this.path];
  }

  @Watch('$route')
  private onRouteChange(to: Route, from: Route) {
    // 定义比较函数
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

    // 决定动画方向
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
  }
}
</script>
<style lang='scss' scoped>
.loadingCtn {
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.backIcon {
  cursor: pointer;
  &:hover {
    color: #2ecc71;
  }
}

.homeIcon {
  text-decoration: none;
}
</style>
