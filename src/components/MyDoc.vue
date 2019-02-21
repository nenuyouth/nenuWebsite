<template>
  <div class="container mt-3 pb-3">
    <!-- <div v-wechat-title="docTitle"></div> -->
    <div id="asideScreenMask" style="display:none;"></div>
    <div class="d-block d-lg-none" id="asideSlide">
      <div class="shadow" id="asideSlideBtn">目录</div>
      <aside class="shadow" id="aside">
        <ul class="ulReboot">
          <li :class="`myli${item[1]}`" :key="item[0]" v-for="item in aside" v-html="item[0]"></li>
        </ul>
      </aside>
    </div>
    <div class="row">
      <div class="col-12 col-lg-9 markdown-body" v-html="compiledMarkdown" v-if="compiledMarkdown"></div>
      <div class="col-12 col-lg-9" v-else>
        <p>加载中......</p>
      </div>
      <div class="d-none d-lg-block col-lg-3">
        <div :style="`max-height:calc(${windowHeight - 192}px - 4rem);`" id="asideCtn">
          <aside :style="`max-height:calc(${windowHeight - 222}px - 4rem);`" class="shadow" id="aside">
            <ul class="ulReboot">
              <li :class="`myli${item[1]}`" :key="item[0]" v-for="item in aside" v-html="item[0]"></li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import marked from "marked";
import hljs from "highlight.js";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";

// 导入css样式
import "highlight.js/styles/default.css";
import "github-markdown-css/github-markdown.css";

const myRenderMD = new marked.Renderer();

// 覆写heading转码
myRenderMD.heading = (text, level) => {
  let id = "";
  if (text.indexOf("a href") !== -1)
    id = text.slice(text.indexOf(">") + 1, text.indexOf("</a>"));

  return `<h${level} id="${id ? id : text}">${text}</h${level}>`;
};

// 覆写链接转码
myRenderMD.link = (href, title, text) => {
  if (href[0] === "#")
    return `<a class='md-a' href='${href}' title='${
      title ? title : text
    }'>${text}</a>`;

  return `<a class='md-link' href='${href}' title='${text}' >${text}</a>`;
};

// 设置marked插件
marked.setOptions({
  renderer: myRenderMD, // 控制输出渲染
  gfm: true, // 是否使用GitHub改进标砖的Markdown
  tables: true, // 是否使用gtm table
  breaks: false, // gfm控制换行输出<br>
  pedantic: false, // 是否尽量接近原生markdown.pl
  sanitize: true, // 是否清理内部html内容
  smartLists: true, // 是否使用更先进列表样式
  smartypants: false, // 是否对部分内容添加额外符号
  xhtml: true, // 是否闭合空标签
  highlight: (code, lang) =>
    lang && hljs.getLanguage(lang)
      ? hljs.highlight(lang, code, true).value
      : hljs.highlightAuto(code).value // highlight代码块
});

@Component
export default class MyDoc extends Vue {
  // 控制侧边栏显示
  private aside: string[][] = [];

  // 渲染好的html文本
  private compiledMarkdown = "";

  // 文档标题
  private docTitle = "内部文档";

  private windowWidth = 375;

  private windowHeight = 750;

  @Prop(String) private path!: string;

  private loadDoc() {
    const path = this.path;
    let markdown = "";
    const asideTemp: string[][] = [];
    const route = this.$route;
    const router = this.$router;

    // 获取markdown文件
    $.ajax({
      async: false,
      url: `/Res/doc/${path}.md`,
      dataType: "text",
      success: data => {
        markdown = data;
      }
    });

    // 返回html
    this.compiledMarkdown = marked(markdown);

    // 窗口大小获取
    $(() => {
      const ctx = this;
      this.windowWidth =
        $(window).width() || document.documentElement.clientWidth;
      this.windowHeight =
        $(window).height() || document.documentElement.clientHeight;
      $(window).resize(() => {
        ctx.windowWidth =
          $(window).width() || document.documentElement.clientWidth;
        ctx.windowHeight =
          $(window).height() || document.documentElement.clientHeight;
      });
    });

    // 返回docTitle和aside
    Vue.nextTick(() => {
      // 设置网页标题
      // this.docTitle = $("h1").text();
      document.title = $("h1").text();

      $("h1,h2,h3,h4").each((index, domEle) => {
        if ($(domEle).children().length === 0) {
          const id = $(domEle).attr("id");
          if (id && id.indexOf("href") === -1) {
            const title = $(domEle).text();
            const level = $(domEle)[0].tagName[1];
            asideTemp.push([
              `<a class="myh${level}" href="#${title}">${title}</a>`,
              level
            ]);
          }
        }
      });
      // $("h1,h2,h3,h4").each((index, element) => {
      //   if (
      //     element.children().length === 0 &&
      //     (element.attr("id")!.indexOf("href") as any) === -1
      //   ) {
      //   const title = element.text();
      //   const level = element[0].tagName[1];
      //   asideTemp.push([
      //     `<a class="myh${level}" href="#${title}">${title}</a>`,
      //     level
      //   ]);
      // }
      // });
      this.aside = asideTemp;
    });

    Vue.nextTick(() => {
      $(() => {
        // // 注册界面滚动动画效果
        // $("a.myh1,a.myh2,a.myh3,a.myh4,a.md-a").click(function() {
        //   $("html, body").animate(
        //     {
        //       // @ts-ignore
        //       scrollTop: `${$($(this).attr("href")).offset().top - 50}px`
        //     },
        //     { duration: 500, easing: "swing" }
        //   );
        //   return false;
        // });
        // 注册文档间跳转逻辑
        $(() => {
          $("a.md-link").click(function() {
            const url = $(this).attr("href");
            if (url) {
              if (url && url[0] === "/") router.push(url);
              else if (
                url.indexOf("http://") !== -1 ||
                url.indexOf("https://") !== -1
              )
                window.open(url);
              else {
                const base = route.path.slice(0, route.path.lastIndexOf("/"));
                router.push(`${base}/${url}`);
              }
              return false;
            }
          });
        });
        // 目录效果实现
        // $("#asideSlideBtn").click(event => {
        //   $("#asideSlide").animate(
        //     {
        //       left:
        //         $(window).width() ||
        //         document.documentElement.clientWidth -
        //           ($("#asideSlide").width() as number)
        //     },
        //     { duration: 500, easing: "swing" }
        //   );
        //   $("#asideScreenMask").fadeIn(500);
        //   $("#asideSlideBtn").fadeOut(500);
        //   event.stopPropagation();
        // });

        // $("#asideScreenMask").click(() => {
        //   $("#asideSlide").animate(
        //     { left: "100%" },
        //     { duration: 500, easing: "swing" }
        //   );
        //   $("#asideSlideBtn").fadeIn(500);
        //   $("#asideScreenMask").fadeOut(500);
        // });
      });
    });
  }

  private mounted() {
    this.loadDoc();
  }

  @Watch("$route")
  private OnRouteUpdate(to: Route, from: Route) {
    this.loadDoc();
  }
}
</script>
<style>
.ulReboot {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
#asideSlide {
  position: fixed;
  height: calc(100% - 40.4px);
  top: 40.4px;
  left: 100%;
  text-align: right;
  z-index: 1040;
}
#asideScreenMask {
  position: fixed;
  width: 100%;
  height: calc(100% - 40.4px);
  top: 40.4px;
  left: 0;
  background-color: rgba(127, 127, 127, 0.15);
  z-index: 1030;
}
#asideSlideBtn {
  position: absolute;
  width: 36px;
  top: 20%;
  left: -36px;
  font-size: 18px;
  padding: 15px 8px;
  font-weight: 500;
  line-height: 1.3;
  background-color: #ffffff;
}
#asideCtn {
  position: fixed;
  top: 4rem;
  text-align: center;
  width: 280px;
}
@media (min-width: 1200px) {
  #asideCtn {
    width: 300px;
  }
}

#aside {
  padding: 15px;
  text-align: left;
  width: 200px;
  /* max-width: 200px; */
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

.myli2 {
  list-style: circle;
  margin-left: 1rem;
}

.myli3 {
  list-style: disc;
  margin-left: 2rem;
}
.myli4 {
  list-style: square;
  margin-left: 3rem;
}

.myh1,
.myh2,
.myh3,
.myh4 {
  display: block;
  color: #333333;
  list-style-type: disc;
}

.myh1 {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin: 5px auto 8px auto;
  border-bottom: 0.5px solid #cacaca;
}
.myh2 {
  font-size: 17px;
  font-weight: 500;
  margin: 5px auto;
  letter-spacing: 0.5px;
}
.myh3 {
  font-size: 16px;
  margin: 3px auto;
}
.myh4 {
  font-size: 14px;
  margin: 2px auto;
}
</style>
