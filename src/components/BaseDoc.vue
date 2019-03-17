<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Markdown显示组件
 * @Date: 2019-02-26 23:43:23
 * @LastEditTime: 2019-03-17 19:26:05
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
        <div :style="`max-height:calc(${windowHeight - 192}px - 4rem);`" id="asideCtn">
          <aside
            :style="`max-height:calc(${windowHeight - 222}px - 4rem);`"
            class="shadow"
            id="aside"
          >
            <a-spin :spinning="$store.state.docLoading">
              <LoadingIcon slot="indicator"/>
              <div
                :class="`h${title.level} asideHeading`"
                :key="title.text"
                @click="scrollToHeading(title.text)"
                v-for="title in aside"
              >{{title.text}}</div>
            </a-spin>
          </aside>
        </div>
      </div>
    </div>

    <!-- md及以下屏幕的目录侧边栏 -->
    <!-- 屏幕蒙层 -->
    <div @click="asideHidden" id="asideScreenMask" style="display:none;"></div>
    <!-- 侧边目录 -->
    <div class="d-block d-lg-none" id="asideSlide" v-if="aside.length!==0">
      <div @click="asideDisplay" class="shadow" id="asideSlideBtn">目录</div>
      <aside class="shadow" id="aside">
        <div
          :class="`h${title.level} asideHeading`"
          :key="title.text"
          @click="scrollToHeading(title.text)"
          v-for="title in aside"
        >{{title.text}}</div>
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

  // 默认的页面宽高
  private windowWidth = 375;
  private windowHeight = 750;

  // Markdown内容
  @Prop(String) private docContent!: string;

  // 初始化目录
  private catalogGernarate() {
    const aside: Aside[] = [];

    // 设置网页标题
    this.docTitle = $('h1').text();

    // 设置目录
    $('h1,h2,h3,h4').each((index, domEle) => {
      if ($(domEle).children()[0].tagName === 'IMG') {
        const id = $(domEle).attr('id');

        if (id && id.indexOf('href') === -1) {
          const text = $(domEle).text();
          const level = $(domEle)[0].tagName[1];

          aside.push({ text, level });
        }
      }
    });

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

    // 注册页面标题点击时的滚动置顶动画效果
    $('.markdown-body :header').on('click', event => {
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
      event.preventDefault();
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

  // 侧边栏点击项目滚动标题实现
  private scrollToHeading(text: string) {
    const offset = $(`#${text}`).offset();

    if (offset) {
      const toTop = offset.top;

      $('html, body').animate({ scrollTop: `${toTop - 50}px` }, { duration: 500, easing: 'swing' });
    }
  }

  // 目录滑出效果实现
  private asideDisplay() {
    const asideWidth = $('#asideSlide').width();

    if (asideWidth)
      $('#asideSlide').animate(
        { left: ($(window).width() || document.documentElement.clientWidth) - asideWidth },
        { duration: 500, easing: 'swing' }
      );

    $('#asideScreenMask').fadeIn(500);
    $('#asideSlideBtn').fadeOut(500);
  }

  // 目录隐藏效果实现
  private asideHidden() {
    $('#asideSlide').animate({ left: '100%' }, { duration: 500, easing: 'swing' });
    $('#asideSlideBtn').fadeIn(500);
    $('#asideScreenMask').fadeOut(500);
  }

  private mounted() {
    console.info('basedoc mounted');
    if (this.docContent)
      Vue.nextTick().then(() => {
        this.catalogGernarate();
        this.actionRegister();
        this.$store.commit('docLoading', false);
      });

    // 获取窗口大小并注册监听窗口大小
    this.windowWidth = $(window).width() || document.documentElement.clientWidth;
    this.windowHeight = $(window).height() || document.documentElement.clientHeight;
    $(window).on('resize', () => {
      this.windowWidth = $(window).width() || document.documentElement.clientWidth;
      this.windowHeight = $(window).height() || document.documentElement.clientHeight;
    });
  }

  private activated() {
    console.info(`basedoc ${this.$route.path} activated`);
    if (this.docContent) this.$store.commit('docLoading', false);
  }

  private deactivated() {
    console.info(`basedoc ${this.$route.path} deactivated`);
  }

  @Watch('docContent')
  private docContentUpdateHadnler() {
    console.info(`basedoc ${this.$route.path} docContentUpdate`);
    Vue.nextTick().then(() => {
      this.catalogGernarate();
      this.actionRegister();
      // 通知父组件加载完成
      this.$store.commit('docLoading', false);
    });
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

.markdown-body {
  min-height: 200px;
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
