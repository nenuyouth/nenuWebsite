<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Markdown显示组件
 * @Date: 2019-02-26 23:43:23
 * @LastEditTime: 2019-03-20 11:05:42
 -->
<template>
  <div class="container mt-3 pb-3" v-wechat-title="docTitle">
    <div class="row">
      <!-- markdown渲染主体 -->
      <div class="col-12 col-lg-9">
        <!-- 加载状态 -->
        <a-spin :spinning="$store.state.docLoading">
          <LoadingIcon slot="indicator"/>
          <div class="markdown-body" v-html="docContent"></div>
        </a-spin>
      </div>

      <!-- lg及以上屏幕的目录侧边栏 -->
      <div class="d-none d-lg-block col-lg-3">
        <div id="asideCtn" v-if="!noneCatalog">
          <aside class="shadow" id="aside">
            <a-anchor
              :affix="false"
              :offsetTop="42"
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
      </div>
    </div>

    <!-- md及以下屏幕的目录侧边栏 -->
    <!-- 屏幕蒙层 -->
    <div @click="asideToggle" id="asideScreenMask" style="display:none;"></div>
    <!-- 侧边目录 -->
    <div
      class="d-block d-lg-none"
      id="asideSlide"
      style="left:100%;"
      v-if="!noneCatalog&&aside.length!==0"
    >
      <div @click="asideToggle" class="shadow" id="asideSlideBtn">目录</div>
      <aside class="shadow" id="aside">
        <div @click="scrollTop" class="asideH1 asideHeading">{{docTitle}}</div>
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
import LoadingIcon from '@/components/LoadingIcon.vue';

// 导入css样式
import 'highlight.js/styles/default.css';
import 'github-markdown-css/github-markdown.css';

interface Aside {
  text: string;
  level: string;
}

@Component({ components: { LoadingIcon } })
export default class BaseDoc extends Vue {
  // 文档标题
  private docTitle = '内部文档';

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
    const title = document.getElementsByTagName('h1')[0].textContent;

    // 设置网页标题
    if (title) this.docTitle = title;

    // 设置目录
    document.querySelectorAll('h2,h3,h4').forEach(domEle => {
      if (domEle.children[0] && domEle.children[0].tagName === 'IMG') {
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

    if (!this.$store.state.iOS) {
      // 注册页面标题悬停时的动画效果
      $('.markdown-body :header').on('mouseover', event => {
        $(event.currentTarget)
          .children('img')
          .css({ display: 'inline-block' });
      });
      $('.markdown-body :header').on('mouseout', event => {
        $(event.currentTarget)
          .children('img')
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
            .children('img')
            .css({ display: 'inline-block' });
          setTimeout(() => {
            $(event.currentTarget)
              .children('img')
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
        $('#asideSlideBtn').fadeIn(500);
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
        $('#asideSlideBtn').fadeOut(500);
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
        $('#asideSlideBtn').fadeIn(500);
        $('#asideScreenMask').fadeOut(500);
      }
    });
  }

  // 组件激活时取消显示loading
  private activated() {
    if (this.docContent) this.$store.commit('docLoading', false);
  }

  @Watch('docContent')
  private docContentUpdateHadnler() {
    Vue.nextTick().then(() => {
      this.catalogGernarate();
      this.actionRegister();
      // 通知父组件加载完成
      this.$store.commit('docLoading', false);
    });
  }
}
</script>
<style>
/* 设置loadingicon样式 */
.loadingCtn {
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* markdown主容器class */
.markdown-body {
  min-height: 200px;
}

#asideSlide {
  position: fixed;
  height: calc(100% - 2.5rem);
  top: 2.5rem;
  text-align: right;
  z-index: 1040;
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
  height: calc(100% - 2.5rem);
  top: 2.5rem;
  left: 0;
  background-color: rgba(127, 127, 127, 0.15);
  z-index: 1030;
}
/* 侧边栏按钮 */
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
  margin: 0 auto 10px auto;
  padding: 15px 10px;
  border-bottom: 0.5px solid #cacaca;
}

.asideH2 {
  font-size: 16.5px;
  font-weight: 700;
  padding: 0 14px;
  margin-bottom: 8px;
  line-height: 1.8;
  color: rgb(44, 62, 80);
}

.asideH3 {
  font-size: 15px;
  padding: 6px 16px 6px 22px;
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
