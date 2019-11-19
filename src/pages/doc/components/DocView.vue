<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Markdown显示组件
 * @Date: 2019-02-26 23:43:23
 * @LastEditTime: 2019-11-19 20:16:50
-->
<template>
  <div class="container mt-3 pb-3">
    <!-- svg载入 -->
    <DocSvg />

    <a-row>
      <!-- markdown渲染主体 -->
      <a-col :lg="18" :xs="24">
        <!-- 加载状态 -->
        <a-spin :spinning="$store.state.docLoading">
          <template #indicator>
            <img alt="加载中" class="loadingIcon" src="/img/icon/logo.png" />
          </template>
          <div class="markdown-body" v-html="docContent" />
        </a-spin>
      </a-col>

      <!-- lg及以上屏幕的目录侧边栏 -->
      <a-col :lg="6" class="d-none d-lg-block">
        <div v-if="!noneCatalog" id="asideCtn">
          <aside id="aside" class="shadow">
            <a-anchor
              :affix="false"
              :offset-top="$store.state.screen.lg? 48: 42"
              :show-ink-in-fixed="true"
              wrapper-class="asideList"
              @click="handleClick"
            >
              <a-skeleton
                v-if="aside.length === 0"
                :paragraph="{ 
                  rows: 12, 
                  width: ['25%','30%','25%','50%','30%','50%','25%','30%','25%','50%','30%','50%']
                }"
                :title="false"
                active
              />
              <a-anchor-link
                v-for="title in aside"
                :key="title.text"
                :class="`asideH${title.level} asideHeading`"
                :href="`#${title.text}`"
                :title="title.text"
              />
            </a-anchor>
          </aside>
        </div>
      </a-col>
    </a-row>

    <!-- md及以下屏幕的目录侧边栏 -->
    <!-- 屏幕蒙层 -->
    <div id="asideScreenMask" style="display:none;" @click="asideToggle" />
    <!-- 侧边目录 -->
    <div
      v-if="!noneCatalog && aside.length !== 0"
      id="asideSlide"
      class="d-block d-lg-none"
      style="left:100%;"
    >
      <div class="asideSlideBtn" @click="asideToggle">
        <template v-if="asideExpand">
          <div class="w-100" style="height:49.6px;" />
          <a-icon style="position:absolute;top:24.3px;left:9.5px;" type="close" />
        </template>
        <template v-else>目录</template>
      </div>
      <aside id="aside" class="shadow">
        <div class="asideH1 asideHeading" @click="scrollTop" v-text="docTitle" />
        <a-anchor
          :affix="false"
          :offset-top="42"
          :show-ink-in-fixed="true"
          wrapper-class="asideList"
          @click="handleClick"
        >
          <a-anchor-link
            v-for="title in aside"
            :key="title.text"
            :class="`asideH${title.level} asideHeading`"
            :href="`#${title.text}`"
            :title="title.text"
          />
        </a-anchor>
      </aside>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import $ from 'jquery';
import DocSvg from './DocSvg.vue';
import actionRegister from '../utils/docAction';

interface Aside {
  text: string;
  level: string;
}

@Component({ components: { DocSvg } })
export default class DocView extends Vue {
  // 文档标题
  private docTitle = '文档';

  // 侧边栏内容
  private aside: Aside[] = [];

  private noneCatalog = false;

  // 侧边栏是否弹出
  private asideExpand = false;

  // 默认的页面宽高
  private windowWidth = 375;

  private windowHeight = 750;

  // Markdown内容
  @Prop({ type: String, default: '<h1>加载中</h1><h2>加载中</h2><p>内容正在加载...</p>' })
  private readonly docContent!: string;

  // 目录切换
  private asideToggle() {
    // 获得侧边栏长度
    const asideWidth = $('#asideSlide').width();

    if (asideWidth)
      if (this.asideExpand) {
        // 如果侧边栏已经展开，则收起
        $('#asideSlide').css({
          left: ($(window).width() || document.documentElement.clientWidth) - asideWidth,
          right: ''
        });
        $('#asideSlide').animate({ left: '100%' }, 500);
        $('#asideScreenMask').fadeOut(500);

        // 否则展开侧边栏
      } else {
        $('#asideSlide').animate(
          { left: ($(window).width() || document.documentElement.clientWidth) - asideWidth },
          500,
          'swing',
          () => {
            $('#asideSlide').css({ right: '0', left: '' });
          }
        );

        $('#asideScreenMask').fadeIn(500);
      }

    // aside状态变更
    this.asideExpand = !this.asideExpand;
  }

  // 侧边栏点击项目滚动标题实现（由a-anchor支持，需要阻止默认事件）
  private handleClick(e: Event) {
    e.preventDefault();
  }

  // 滚动到顶
  private scrollTop() {
    $('html, body').animate({ scrollTop: '0px' }, { duration: 500, easing: 'swing' });
  }

  private mounted() {
    // 加载时执行页面处理
    if (this.docContent)
      Vue.nextTick().then(() => {
        actionRegister(this);
      });

    // 获取窗口大小并注册监听窗口大小
    this.windowWidth = $(window).width() || document.documentElement.clientWidth;
    this.windowHeight = $(window).height() || document.documentElement.clientHeight;
    $(window).on('resize', () => {
      this.windowWidth = $(window).width() || document.documentElement.clientWidth;
      this.windowHeight = $(window).height() || document.documentElement.clientHeight;

      // 如果是lg以上屏幕且侧边栏处于打开状态，收起侧边栏
      if (this.asideExpand && this.windowWidth >= 992) {
        this.asideExpand = false;
        $('#asideSlide').css({ left: '100%', right: '' });
        $('#asideScreenMask').fadeOut(500);
      }
    });
  }

  // 组件激活
  private activated() {
    const title = $('h1').text();

    // 设置网页标题
    if (title) this.$emit('title', title);
    // 取消显示loading
    if (this.docContent) this.$store.commit('loadDoc', false);
  }

  @Watch('docContent')
  private onDocContentChange() {
    Vue.nextTick().then(() => {
      actionRegister(this);
      // 通知父组件加载完成
      this.$store.commit('loadDoc', false);
    });
  }
}
</script>
<style lang='stylus'>
@require '../utils/doc.styl'

/* 设置loadingicon样式 */
.ant-spin-spinning
  min-height calc(100vh - 370px)

.loadingIcon
  width 80px
  height 80px
  margin 0 !important
  top calc(50% - 40px) !important
  left calc(50% - 40px) !important
  -webkit-animation loading 2s linear 0s none infinite normal
  animation loading 2s linear 0s none infinite normal

@keyframes loading
  0%
    -webkit-transform rotate(0deg)
    transform rotate(0deg)

  10%
    -webkit-transform rotate(7.2deg)
    transform rotate(7.2deg)

  20%
    -webkit-transform rotate(28.8deg)
    transform rotate(28.8deg)

  30%
    -webkit-transform rotate(64.8deg)
    transform rotate(64.8deg)

  40%
    -webkit-transform rotate(115.2deg)
    transform rotate(115.2deg)

  50%
    -webkit-transform rotate(180deg)
    transform rotate(180deg)

  60%
    -webkit-transform rotate(244.8deg)
    transform rotate(244.8deg)

  70%
    -webkit-transform rotate(295.2deg)
    transform rotate(295.2deg)

  80%
    -webkit-transform rotate(331.2deg)
    transform rotate(331.2deg)

  90%
    -webkit-transform rotate(352.8deg)
    transform rotate(352.8deg)

  100%
    -webkit-transform rotate(360deg)
    transform rotate(360deg)
</style>
