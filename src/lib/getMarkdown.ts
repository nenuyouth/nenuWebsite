/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Markdown文件获取
 * @Date: 2019-03-17 16:48:38
 * @LastEditTime: 2019-03-17 18:22:57
 */
import Vue from 'vue';
import axios from 'axios';
import hljs from 'highlight.js';
import marked from 'marked';
// import { Store } from 'vuex';

// 初始化Markdown渲染实例
const myRenderMD = new marked.Renderer();


// 覆写heading转码
myRenderMD.heading = (text, level) => {
  let id = '';

  // 如果heading中存在链接，则将id设置成该链接的文字
  if (text.indexOf('a href') !== -1) id = text.slice(text.indexOf('>') + 1, text.indexOf('</a>'));

  return `<h${level} id="${id ||
    text}" class="mdHeading"><img class="mdIcon" src="/img/icon/link.svg" />${text}</h${level}>`;
};

// 覆写链接转码，如果包含#，意味着是该网页内部跳转
myRenderMD.link = (href, title, text) =>
  href[0] === '#'
    ? `<a class='md-a' href='${href}' title='${title || text}'>${text}</a>`
    : `<a class='md-link' href='${href}' title='${text}'>${text}</a>`;

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
  // Highlight代码块
  highlight: (code, lang) =>
    lang && hljs.getLanguage(lang) ? hljs.highlight(lang, code, true).value : hljs.highlightAuto(code).value
});

// store: Store<any>
const getCompiledMarkdown = async (path: string, ctx: Vue, url?: string) => {
  const store = ctx.$store;
  const docContent = store.state.compiledMarkdown.path;

  if (!docContent)
    // 如果未下载并处理过markdown文件，立即下载并缓存
    await axios.get(url ? url + path : `/server/doc.php?password=5201314&path=${path}`).then(async response => {
      if (response.data.slice(0, 6) === '<br />')
        await axios
          .get(url ? `${url + path}%2freadme` : `/server/doc.php?password=5201314&path=${path}%2freadme`)
          .then(response2 => {
            if (response2.data.slice(0, 6) === '<br />')
              ctx.$confirm({
                title: '地址错误',
                content: '链接地址有误，请汇报给Mr.Hope!',
                autoFocusButton: 'cancel',
                cancelText: '确定',
                okText: '汇报',
                okType: 'danger',
                onOk: () => {
                  window.open('http://wpa.qq.com/msgrd?v=3&uin=1178522294&site=qq&menu=yes');
                }
              });
            else store.commit('compiledMarkdown', [path, marked(response2.data)]);
          })
          .catch(err => {
            ctx.$confirm({
              title: '网络请求错误',
              content: `请求文档出错，错误码为：\n${err}\n您可以汇报给Mr.Hope！`,
              autoFocusButton: 'cancel',
              cancelText: '确定',
              okText: '汇报',
              okType: 'danger',
              onOk: () => {
                window.open('http://wpa.qq.com/msgrd?v=3&uin=1178522294&site=qq&menu=yes');
              }
            });
          });
      else store.commit('compiledMarkdown', [path, marked(response.data)]);
    });
};

export default getCompiledMarkdown;
