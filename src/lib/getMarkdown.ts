/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Markdown文件获取
 * @Date: 2019-03-17 16:48:38
 * @LastEditTime: 2019-03-18 16:48:20
 */

import Vue from 'vue';
import axios from 'axios';
import hljs from 'highlight.js';
import marked from 'marked';

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
  breaks: true, // 使用GitHub Flavored Markdown控制换行输出<br>
  gfm: true, // 是否使用GitHub改进标准的Markdown
  langPrefix: 'hljs ',
  pedantic: false, // 是否尽量接近原生markdown.pl
  renderer: myRenderMD, // 控制输出渲染
  sanitize: true, // 是否清理内部html内容
  smartLists: true, // 是否使用更先进列表样式
  smartypants: false, // 是否对部分内容添加额外符号
  tables: true, // 是否使用gtm table
  xhtml: true, // 是否闭合空标签
  // Highlight代码块
  highlight: (code, lang) =>
    lang && hljs.getLanguage(lang) ? hljs.highlight(lang, code, true).value : hljs.highlightAuto(code).value
});

/**
 * 自定义弹窗警告
 *
 * @param ctx Vue组件对象指针
 * @param [netError] 错误类型是否为网络错误
 * @param [err] 额外的错误信息
 */
const myAlert = (ctx: Vue, netError?: boolean, err?: string) => {
  ctx.$store.commit('docLoading', false);
  ctx.$confirm({
    title: netError ? '网络请求错误' : '地址错误',
    content: netError ? `请求文档出错，错误码为：\n${err}\n您可以汇报给Mr.Hope!` : '链接地址有误。请汇报给Mr.Hope!',
    autoFocusButton: 'cancel',
    cancelText: '确定',
    okText: '汇报',
    okType: 'danger',
    onOk: () => {
      window.open('http://wpa.qq.com/msgrd?v=3&uin=1178522294&site=qq&menu=yes');
    }
  });
};

/**
 * 获取编译后的markdown
 *
 * @param path Markdown路径
 * @param ctx Vue组件对象指针
 * @param stateName 存储对象在state中的名称
 * @param [url] 服务器请求路经
 * @returns 是否继续导航
 */
const getCompiledMarkdown = async (path: string, ctx: Vue, stateName: string, url?: string) => {
  const store = ctx.$store;
  const docContent = store.state[stateName].path;
  let navigate = true;

  if (!docContent)
    // 如果未下载并处理过markdown文件，立即下载并缓存
    await axios.get(`${url}${path}`).then(response => {
      if (response.data === 'file not found') {
        navigate = false;
        myAlert(ctx);
      } else store.commit(stateName, [path, marked(response.data)]);
    }).catch(err => {
      navigate = false;
      myAlert(ctx, true, err);
    });

  return navigate;
};

export default getCompiledMarkdown;
