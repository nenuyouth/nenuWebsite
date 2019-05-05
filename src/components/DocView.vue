<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Markdown显示组件
 * @Date: 2019-02-26 23:43:23
 * @LastEditTime: 2019-05-04 11:52:12
-->
<template>
  <div class="container mt-3 pb-3">
    <!-- svg载入 -->
    <svg style="display:none;">
      <symbol id="link">
        <path
          d="M361.173333 481.834667c48.341333-48.341333 132.650667-48.341333 180.992 0l30.165334 30.165333
          60.330666-60.330667-30.165333-30.165333c-40.234667-40.277333-93.824-62.506667-150.826667-62.506667s-110.592
          22.229333-150.826666 62.506667L210.304 512a213.674667 213.674667 0 0 0 0 301.696 212.608 212.608 0
          0 0 150.826667 62.378667A212.565333 212.565333 0 0 0 512
          813.696l30.165333-30.165333-60.330666-60.330667-30.165334 30.165333a128.298667 128.298667
          0 0 1-181.034666 0 128.213333 128.213333 0 0 1 0-181.034666l90.538666-90.496z"
        ></path>
        <path
          d="M723.157333 602.496L813.696 512a213.674667 213.674667 0 0 0 0-301.696 213.589333 213.589333 0 0
          0-301.696 0l-30.165333 30.165333 60.330666 60.330667 30.165334-30.165333a128.298667 128.298667 0 0 1
          181.034666 0 128.213333 128.213333 0 0 1 0 181.034666l-90.538666 90.496c-48.341333 48.341333-132.650667
          48.341333-180.992 0L451.669333 512l-60.330666 60.330667 30.165333 30.165333c40.234667 40.277333
          93.824 62.506667 150.826667 62.506667s110.592-22.229333 150.826666-62.506667z"
        ></path>
      </symbol>
      <!-- 外部链接 -->
      <symbol id="outbound">
        <path
          d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,
          0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
          fill="#3cba63"
        ></path>
        <polygon
          fill="#3cba63"
          points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
        ></polygon>
      </symbol>
    </svg>

    <a-row>
      <!-- markdown渲染主体 -->
      <a-col :lg="18" :xs="24">
        <!-- 加载状态 -->
        <a-spin :spinning="$store.state.docLoading">
          <template #indicator>
            <img alt="加载中" class="loadingIcon" src="/img/icon/logo.png">
          </template>
          <div class="markdown-body" v-html="docContent"/>
        </a-spin>
      </a-col>

      <!-- lg及以上屏幕的目录侧边栏 -->
      <a-col :lg="6" class="d-none d-lg-block">
        <div id="asideCtn" v-if="!noneCatalog">
          <aside class="shadow" id="aside">
            <a-anchor
              :affix="false"
              :offsetTop="$store.state.screen.lg?48:42"
              :showInkInFixed="true"
              @click="handleClick"
              wrapperClass="asideList"
            >
              <a-skeleton
                :paragraph="{rows: 12,width:['25%','30%','25%','50%','30%','50%','25%','30%','25%','50%','30%','50%']}"
                :title="false"
                active
                v-if="aside.length===0"
              />
              <a-anchor-link
                :class="`asideH${title.level} asideHeading`"
                :href="`#${title.text}`"
                :key="title.text"
                :title="title.text"
                v-for="title in aside"
              />
            </a-anchor>
          </aside>
        </div>
      </a-col>
    </a-row>

    <!-- md及以下屏幕的目录侧边栏 -->
    <!-- 屏幕蒙层 -->
    <div @click="asideToggle" id="asideScreenMask" style="display:none;"/>
    <!-- 侧边目录 -->
    <div
      class="d-block d-lg-none"
      id="asideSlide"
      style="left:100%;"
      v-if="!noneCatalog&&aside.length!==0"
    >
      <div @click="asideToggle" class="asideSlideBtn">
        <template v-if="asideExpand">
          <div class="w-100" style="height:21px;"/>
          <a-icon style="position:absolute;top:10px;left:9.5px;" type="close"/>
        </template>
        <template v-else>目录</template>
      </div>
      <aside class="shadow" id="aside">
        <div @click="scrollTop" class="asideH1 asideHeading" v-text="docTitle"/>
        <a-anchor
          :affix="false"
          :offsetTop="42"
          :showInkInFixed="true"
          @click="handleClick"
          wrapperClass="asideList"
        >
          <a-anchor-link
            :class="`asideH${title.level} asideHeading`"
            :href="`#${title.text}`"
            :key="title.text"
            :title="title.text"
            v-for="title in aside"
          />
        </a-anchor>
      </aside>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';

interface Aside {
  text: string;
  level: string;
}

@Component
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
  private docContent!: string;

  // 初始化目录
  private catalogGernarate() {
    const aside: Aside[] = [];
    const title = $('h1').text();

    // 设置网页标题
    this.$emit('title', title);
    this.docTitle = title;

    // 设置目录
    document.querySelectorAll('h2,h3,h4').forEach(domEle => {
      if (domEle.children[0] && domEle.children[0].tagName.toLowerCase() === 'svg') {
        const { id } = domEle;

        if (id && id.indexOf('href') === -1) {
          const text = domEle.textContent;
          const level = domEle.tagName[1];

          if (text) aside.push({ text, level });
        }
      }
    });

    this.noneCatalog = aside.length === 0;

    this.aside = aside;
  }

  // 注册页面内动作
  private actionRegister() {
    const route = this.$route;
    const router = this.$router;

    // 注册页面内部链接点击时的滚动动画效果
    $('a.md-a').on('click', event => {
      const id = $(event.currentTarget).attr('href');

      if (id) {
        const offset = $(id).offset();

        if (offset) $('html, body').animate({ scrollTop: `${offset.top - 50}px` }, { duration: 500, easing: 'swing' });
      }

      event.preventDefault();
    });

    if (!this.$store.state.systemInfo.iOS) {
      // 注册页面标题悬停时的动画效果
      $('.markdown-body :header').on('mouseover', event => {
        $(event.currentTarget)
          .children('svg')
          .css({ display: 'inline-block' });
      });
      $('.markdown-body :header').on('mouseout', event => {
        $(event.currentTarget)
          .children('svg')
          .css({ display: 'none' });
      });
    }

    // 注册页面标题点击时的滚动置顶动画效果
    $('.markdown-body :header').on('click', event => {
      // 如果当前标题只有一个childNode，即标题内不存在链接仅有图片node，进行滚动动画
      if ($(event.currentTarget).children().length === 1) {
        const offset = $(event.currentTarget).offset();

        if (offset) {
          // 滚动动画效果
          $('html, body').animate({ scrollTop: `${offset.top - 50}px` }, { duration: 500, easing: 'swing' });

          // 链接图标的动画效果
          $(event.currentTarget)
            .children('svg')
            .css({ display: 'inline-block' });
          setTimeout(() => {
            $(event.currentTarget)
              .children('svg')
              .css({ display: 'none' });
          }, 1500);
        }
      }
    });

    // 注册文档间跳转逻辑
    $('a.md-link').on('click', event => {
      const url = $(event.currentTarget).attr('href');

      if (url)
        if (url && url[0] === '/')
          // 内部绝对路径
          router.push(url);
        else if (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1)
          // 外部链接
          window.open(url);
        else {
          // 内部相对路径
          const base = route.path.slice(0, route.path.lastIndexOf('/'));

          router.push(`${base}/${url}`);
        }
      else
        this.$confirm({
          title: '地址错误',
          content: '链接地址有误，请汇报给Mr.Hope!',
          autoFocusButton: 'cancel',
          cancelText: '确定',
          okText: '汇报',
          okType: 'danger',
          onOk: () => {
            router.back();
            window.open('http://wpa.qq.com/msgrd?v=3&uin=1178522294&site=qq&menu=yes');
          },
          onCancel: () => {
            router.back();
          }
        });

      event.preventDefault();
    });
  }

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
        this.catalogGernarate();
        this.actionRegister();
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
      this.catalogGernarate();
      this.actionRegister();
      // 通知父组件加载完成
      this.$store.commit('loadDoc', false);
    });
  }
}
</script>
<style>
/* 设置loadingicon样式 */
.ant-spin-spinning {
  min-height: calc(100vh - 370px);
}
.loadingIcon {
  width: 80px;
  height: 80px;
  margin: 0 !important;
  top: calc(50% - 40px) !important;
  left: calc(50% - 40px) !important;
  -webkit-animation: loading 2s linear 0s none infinite normal;
  animation: loading 2s linear 0s none infinite normal;
}

@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  10% {
    -webkit-transform: rotate(7.2deg);
    transform: rotate(7.2deg);
  }
  20% {
    -webkit-transform: rotate(28.8deg);
    transform: rotate(28.8deg);
  }
  30% {
    -webkit-transform: rotate(64.8deg);
    transform: rotate(64.8deg);
  }
  40% {
    -webkit-transform: rotate(115.2deg);
    transform: rotate(115.2deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  60% {
    -webkit-transform: rotate(244.8deg);
    transform: rotate(244.8deg);
  }
  70% {
    -webkit-transform: rotate(295.2deg);
    transform: rotate(295.2deg);
  }
  80% {
    -webkit-transform: rotate(331.2deg);
    transform: rotate(331.2deg);
  }
  90% {
    -webkit-transform: rotate(352.8deg);
    transform: rotate(352.8deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
/* markdown主容器class */
.markdown-body {
  min-height: 200px;
  color: #34495e;
}

#asideSlide {
  position: fixed;
  height: 100%;
  top: 40px;
  text-align: right;
  z-index: 5;
}

#asideSlide #aside {
  margin-left: auto;
  max-width: 80vw;
  height: 100%;
}

/* 侧边栏Mask*/
#asideScreenMask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 40px;
  left: 0;
  background-color: rgba(127, 127, 127, 0.15);
  z-index: 4;
}
/* 侧边栏按钮 */
.asideSlideBtn {
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
  -webkit-box-shadow: -2px 0 5px rgba(0, 0, 0, 0.15);
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.15);
}

/* 目录浮块 */
#asideCtn {
  position: fixed;
  top: 4rem;
  width: 225px;
}

#asideCtn #aside {
  border-radius: 5px;
  max-height: calc(100vh - 255px);
}

/* 目录 */
#aside {
  text-align: left;
  width: auto;
  background-color: #ffffff;
  overflow-y: auto;
}

/* 目录列表 */
.asideList {
  padding: 15px 0 0 15px;
  max-height: 100%;
}

/* 滚动条去除 */
#asideCtn #aside::-webkit-scrollbar,
.asideList::-webkit-scrollbar {
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

.asideH1 {
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  margin: 0 auto;
  padding: 15px 10px;
  border-bottom: 0.5px solid #cacaca;
}

.asideH2 {
  font-size: 16.5px;
  font-weight: 700;
  padding: 2px 14px 4px 14px;
  line-height: 1.8;
  color: rgb(44, 62, 80);
}

.asideH3 {
  font-size: 15px;
  padding: 6px 16px 6px 22px;
}
.asideH2 + .asideH3 {
  padding-top: 10px;
}

.asideH4 {
  font-size: 14px;
  padding: 3px 35px;
}

.mdHeading {
  cursor: pointer;
}

.mdIcon {
  display: none;
  vertical-align: middle;
  position: relative;
}

h1 .mdIcon {
  margin-left: -33px;
  margin-right: 3px;
  width: 30px;
  height: 30px;
}

h2 .mdIcon {
  margin-left: -24px;
  margin-right: 2px;
  width: 22px;
  height: 22px;
}

h3 .mdIcon {
  margin-left: -22.5px;
  margin-right: 4.5px;
  width: 18px;
  height: 18px;
  top: -1px;
}

h4 .mdIcon {
  margin-left: -21px;
  margin-right: 6px;
  width: 15px;
  height: 15px;
  top: -1.5px;
}

.outbound {
  color: #aaa;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -1px;
}
</style>
