<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Markdown显示组件
 * @Date: 2019-02-26 23:43:23
 * @LastEditTime: 2019-03-22 19:40:07
 -->
<template>
  <!-- 标题设置 -->
  <div class="w-100" v-wechat-title="docTitle">
    <!-- 面包屑导航 -->
    <div class="container mt-2">
      <!-- 返回按钮 -->
      <span class="backIcon">
        <icon-font @click="$router.back()" type="icon-back"/>&ensp;back&ensp;
      </span>|
      <a-breadcrumb style="display:inline-block">
        <a-breadcrumb-item>
          <router-link :to="basepath" v-if="routes.length">
            &ensp;
            <a-icon style="font-size:16px;" type="home"/>&ensp;home
          </router-link>
          <a-icon type="home" v-else/>
        </a-breadcrumb-item>
        <a-breadcrumb-item :key="route" v-for="(route,index) in routes">
          <template v-if="index===routes.length-1">{{route}}</template>
          <router-link :to="`${basepath}/${routes.slice(0,index+1).join('/')}`" v-else>{{route}}</router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <!-- 密码弹窗 -->
    <PasswordModal
      @login="login"
      passwordKey="internalPassword"
      url="/server/passwordValidate"
      v-if="!$store.state.internalLogin"
    />
    <!-- <transition :name="transitionName" mode="in-out"> -->
    <keep-alive>
      <!-- 文档显示 -->
      <BaseDoc :docContent="compiledMarkdown" :key="path" @title="docTitle=$event"/>
    </keep-alive>
    <!-- </transition> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import BaseDoc from '@/components/BaseDoc.vue';
import PasswordModal from '@/components/PasswordModal.vue';
import getCompiledMarkdown from '@/lib/getMarkdown';

@Component({ components: { BaseDoc, PasswordModal } })
export default class MyDoc extends Vue {
  // 文档标题
  private docTitle = '内部文档';

  // Markdown编译内容
  private compiledMarkdown = '';

  // 动画状态
  private transitionName = 'slide-left';

  // MarkDown基准路径字符数
  @Prop(Number) private baselength!: number;

  private get basepath() {
    return this.$route.path.slice(0, this.baselength - 1);
  }

  private get path() {
    return this.$route.path.slice(this.baselength) || 'readme';
  }

  private get routes() {
    return this.$route.path.slice(this.baselength).split('/');
  }

  // 登陆成功，开始获取markdown文件
  private async login() {
    // 如果该路径markdown未被缓存则获取之
    if (!this.$store.state.compiledMarkdown[this.path])
      await getCompiledMarkdown(
        this.path,
        this,
        `/server/doc.php?password=${this.$store.state.internalPassword}&path=`
      );

    // 当路径改变时写入编译后的html
    this.compiledMarkdown = this.$store.state.compiledMarkdown[this.path];
  }

  private async mounted() {
    // 如果已经登陆,直接加载，否则等待login函数触发
    if (this.$store.state.internalLogin) {
      // 如果该路径markdown未被缓存则获取之
      if (!this.$store.state.compiledMarkdown[this.path])
        await getCompiledMarkdown(
          this.path || 'readme',
          this,
          `/server/doc.php?password=${this.$store.state.internalPassword}&path=`
        );

      // 写入编译后的html
      this.compiledMarkdown = this.$store.state.compiledMarkdown[this.path];
    }
  }

  @Watch('path')
  private onPathChange(to: string, from: string) {
    // 当路径改变时写入编译后的html
    this.compiledMarkdown = this.$store.state.compiledMarkdown[this.path];
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
<style scoped>
.loadingCtn {
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.backIcon {
  cursor: pointer;
}

.backIcon:hover {
  color: #3cba63;
}

#asideSlide {
  position: fixed;
  height: calc(100% - 2.5rem);
  top: 2.5rem;
  left: 100%;
  text-align: right;
  z-index: 1040;
}

#asideScreenMask {
  position: fixed;
  width: 100%;
  height: calc(100% - 2.5rem);
  top: 2.5rem;
  left: 0;
  background-color: rgba(127, 127, 127, 0.15);
  z-index: 1030;
}

#asideSlideBtn {
  position: absolute;
  width: 36px;
  top: 20%;
  left: -36px;
  padding: 8px;
  font-weight: 600;
  font-size: 17px;
  line-height: 1.5;
  color: rgb(44, 62, 80);
  background-color: #ffffff;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
#asideCtn {
  position: fixed;
  top: 4rem;
  width: 265px;
}

@media (min-width: 1200px) {
  #asideCtn {
    width: 300px;
  }
}

#aside {
  text-align: left;
  width: 200px;
  background-color: #ffffff;
  overflow-y: auto;
}

#asideSlide #aside {
  margin: 0 0 0 auto;
  height: 100%;
}
#asideCtn #aside {
  max-height: calc(100% - 30px);
  margin: 0 auto;
}
#aside::-webkit-scrollbar {
  display: none;
}

.asideHeading {
  display: block;
  color: rgb(44, 62, 80);
  word-wrap: break-word;
}
.asideHeading:visited {
  text-decoration: none;
}
.asideHeading:hover {
  text-decoration: none;
  color: #000;
  background-color: rgba(127, 127, 127, 0.15);
  cursor: pointer;
}

.h1 {
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  margin: 0 auto 10px auto;
  padding: 15px 0;
  border-bottom: 0.5px solid #cacaca;
}
.h2 {
  font-size: 16.5px;
  font-weight: 700;
  padding: 0 24px;
  margin-bottom: 8px;
  line-height: 1.8;
  color: rgb(44, 62, 80);
}
.h3 {
  font-size: 15px;
  padding: 6px 16px 6px 32px;
}
.h4 {
  font-size: 14px;
  padding: 3px 45px;
}
</style>
<style>
.mdHeading {
  cursor: pointer;
}
.mdIcon {
  display: none;
}
h1 .mdIcon {
  margin-left: -35px;
  margin-right: 3px;
  width: 32px;
  height: 32px;
}

h2 .mdIcon {
  margin-left: -26px;
  margin-right: 2px;
  width: 24px;
  height: 24px;
}

h3 .mdIcon {
  margin-left: -22px;
  margin-right: 2px;
}

h4 .mdIcon {
  margin-left: -18px;
  margin-right: 2px;
  width: 16px;
  height: 16px;
}
</style>
