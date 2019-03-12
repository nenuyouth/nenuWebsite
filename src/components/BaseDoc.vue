<template>
  <div class="container mt-3 pb-3">
    <!-- <div v-wechat-title="docTitle"></div> -->
    <div @click="asideHidden()" id="asideScreenMask" style="display:none;"></div>
    <div class="d-block d-lg-none" id="asideSlide" v-if="aside.length!==0">
      <div @click="asideDisplay()" class="shadow" id="asideSlideBtn">目录</div>
      <aside class="shadow" id="aside">
        <div
          :class="`h${title.level} asideHeading`"
          :key="title.text"
          @click="scrollToHeading(title.text)"
          v-for="title in aside"
        >{{title.text}}</div>
      </aside>
    </div>
    <div class="row">
      <div class="col-12 col-lg-9 markdown-body" v-html="compiledMarkdown" v-if="compiledMarkdown"></div>
      <div class="col-12 col-lg-8 offset-lg-2 loadingCtn" v-else>
        <loading/>
      </div>
      <div class="d-none d-lg-block col-lg-3" v-if="aside.length!==0">
        <div :style="`max-height:calc(${windowHeight - 192}px - 4rem);`" id="asideCtn">
          <aside
            :style="`max-height:calc(${windowHeight - 222}px - 4rem);`"
            class="shadow"
            id="aside"
          >
            <div
              :class="`h${title.level} asideHeading`"
              :key="title.text"
              @click="scrollToHeading(title.text)"
              v-for="title in aside"
            >{{title.text}}</div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import marked from 'marked';
import hljs from 'highlight.js';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import Loading from '@/components/LoadingIcon.vue';

// 导入css样式
import 'highlight.js/styles/default.css';
import 'github-markdown-css/github-markdown.css';

interface Aside {
  text: string;
  level: string;
}

const myRenderMD = new marked.Renderer();

// 覆写heading转码
myRenderMD.heading = (text, level) => {
  let id = '';

  // 如果heading中存在链接，则将id设置成该链接的文字
  if (text.indexOf('a href') !== -1) id = text.slice(text.indexOf('>') + 1, text.indexOf('</a>'));

  return `<h${level} id="${id || text}">${text}</h${level}>`;
};

// 覆写链接转码
myRenderMD.link = (href, title, text) => {
  // 如果包含#，意味着是该网页内部跳转
  return href[0] === '#'
    ? `<a class='md-a' href='${href}' title='${title || text}'>${text}</a>`
    : `<a class='md-link' href='${href}' title='${text}' >${text}</a>`;
};

// 设置marked插件
marked.setOptions({
  renderer: myRenderMD, // 控制输出渲染
  gfm: true, // 是否使用GitHub改进标准的Markdown
  tables: true, // 是否使用gtm table
  breaks: false, // 使用GitHub Flavored Markdown控制换行输出<br>
  pedantic: false, // 是否尽量接近原生markdown.pl
  sanitize: true, // 是否清理内部html内容
  smartLists: true, // 是否使用更先进列表样式
  smartypants: false, // 是否对部分内容添加额外符号
  xhtml: true, // 是否闭合空标签
  highlight: (code, lang) => {
    // Highlight代码块
    return lang && hljs.getLanguage(lang) ? hljs.highlight(lang, code, true).value : hljs.highlightAuto(code).value;
  }
});

@Component({ components: { Loading } })
export default class BaseDoc extends Vue {
  // 侧边栏内容
  private aside: Aside[] = [];

  // 渲染好的html文本
  private compiledMarkdown = '';

  // 文档标题
  private docTitle = '内部文档';

  // 默认的页面宽高
  private windowWidth = 375;
  private windowHeight = 750;

  // MarkDown路径
  @Prop(String) private path!: string;

  private async loadMarkdown() {
    const path = encodeURIComponent(this.path.slice(1));
    // const path = this.path;
    const router = this.$router;

    // 获取markdown文件
    await axios.get(`/server/doc2.php?password=5201314&path=${path}`).then(response => {
      if (response.data.slice(0, 6) === '<br />') {
        alert('链接地址有误，请汇报给Mr.Hope!');
        router.back();
      } else this.compiledMarkdown = marked(response.data);
    });
    // await axios.get(`/Res/doc/${path}.md`).then(response => {
    //   // 如果链接地址错误，提示反馈并返回到上一个界面
    //   if (response.data.slice(1, 9) === '!DOCTYPE') {
    //     alert('链接地址有误，请汇报给Mr.Hope!');
    //     router.back();
    //   } else this.compiledMarkdown = marked(response.data); // 链接地址正确，直接运算返回html
    // });
  }

  // 初始化目录
  private catalogGernarate() {
    const aside: Aside[] = [];

    // 设置网页标题
    document.title = $('h1').text();

    // 设置目录
    $('h1,h2,h3,h4').each((index, domEle) => {
      if ($(domEle).children().length === 0) {
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

  private registerAction() {
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

    // 注册页面标题点击时的滚动置顶动画效果
    $('.markdown-body :header').on('click', event => {
      const offset = $(event.currentTarget).offset();

      if (offset) $('html, body').animate({ scrollTop: `${offset.top - 50}px` }, { duration: 500, easing: 'swing' });
      event.preventDefault();
    });

    // 注册文档间跳转逻辑
    $('a.md-link').on('click', event => {
      const url = $(event.currentTarget).attr('href');

      if (url)
        if (url && url[0] === '/') router.push(url);
        else if (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1) window.open(url);
        else {
          const base = route.path.slice(0, route.path.lastIndexOf('/'));

          router.push(`${base}/${url}`);
        }
      else alert('链接地址有误，请汇报给Mr.Hope!');

      event.preventDefault();
    });
  }

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

  private async mounted() {
    await this.loadMarkdown();

    Vue.nextTick().then(() => {
      this.catalogGernarate();
      this.registerAction();

      // 窗口大小获取并注册监听窗口大小
      this.windowWidth = $(window).width() || document.documentElement.clientWidth;
      this.windowHeight = $(window).height() || document.documentElement.clientHeight;
      $(window).on('resize', () => {
        this.windowWidth = $(window).width() || document.documentElement.clientWidth;
        this.windowHeight = $(window).height() || document.documentElement.clientHeight;
      });
    });
  }

  @Watch('$route')
  private onRouteUpdate(to: Route, from: Route) {
    this.compiledMarkdown = '';

    Vue.nextTick()
      .then(async () => {
        await this.loadMarkdown();
      })
      .then(() => {
        this.catalogGernarate();
        this.registerAction();
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
