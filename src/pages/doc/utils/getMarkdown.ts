/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Markdown文件获取
 * @Date: 2019-03-17 16:48:38
 * @LastEditTime: 2019-03-18 16:48:20
 */

import Vue from 'vue';
import axios from 'axios';
import hljs from './hljs';
import marked from 'marked';

// init Markdown Render Instance
const myRenderMD = new marked.Renderer();

// rewrite heading parse
myRenderMD.heading = (text, level) => {
  let id = '';

  // if link in heading, set id as link text
  if (text.indexOf('a href') !== -1)
    id = text.slice(
      text.indexOf('>') + 1,
      text.lastIndexOf('<svg') === -1
        ? text.indexOf('</a>')
        : text.lastIndexOf('<svg')
    );

  return `<h${level} id="${id ||
    text}" class="mdHeading"><svg viewBox='0 0 1024 1024' class='mdIcon'><use x="0" y="0" xlink:href="#link" /></svg>${text}</h${level}>`;
};

// rewrite link parse: if link url contains '#', means it's an inside navigation
myRenderMD.link = (url, title, text) =>
  url[0] === '#'
    ? `<a class='md-a' href='${url}' title='${title || text}'>${text}</a>`
    : url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
    ? `<a href='${url}' class='md-link' title='${text}'>${text}<svg width='15' height='15' viewBox="0 0 100 100" class='outbound'><use x="0" y="0" xlink:href="#outbound" /></svg></a>`
    : `<a href='${url}' class='md-link' title='${text}'>${text}</a>`;

// rewrite list parse to prevent seeing link icon on list items
myRenderMD.listitem = text =>
  `<li>${
    text.indexOf('#link') === -1
      ? text
      : text.replace(
          /<svg viewBox='0 0 1024 1024' class='mdIcon'><use x="0" y="0" xlink:href="#link" \/><\/svg>/u,
          ''
        )
  }</li>`;

// set marked package options
marked.setOptions({
  breaks: true, // whether use GitHub Flavored Markdown controls linebreaks output `<br>`
  gfm: true, // whether use Github-improved Markdown (Is-Default)
  langPrefix: 'hljs ', // code block class prefix
  pedantic: false, // whether render as native markdown.pl
  renderer: myRenderMD, // 控制输出渲染
  // sanitize: true, // whether clean the html content inside before parsed
  smartLists: true, // whether use advanced list style
  smartypants: false, // whether add additional symbols for specific content
  xhtml: true, // 是否闭合空标签
  // Highlight Code Block
  highlight: (code, lang) =>
    lang && hljs.getLanguage(lang)
      ? hljs.highlight(lang, code, true).value
      : hljs.highlightAuto(code).value
});

/**
 * 自定义弹窗警告
 *
 * @param ctx Vue组件对象指针
 * @param [netError] 错误类型是否为网络错误
 * @param [err] 额外的错误信息
 */
const myAlert = (ctx: Vue, netError?: boolean, err?: string) => {
  ctx.$store.commit('loadDoc', false);
  ctx.$confirm({
    title: netError ? '网络请求错误' : '地址错误',
    content: netError
      ? `请求文档出错，错误码为：\n${err}\n您可以汇报给Mr.Hope!`
      : '链接地址有误。请汇报给Mr.Hope!',
    autoFocusButton: 'cancel',
    cancelText: '确定',
    okText: '汇报',
    okType: 'danger',
    onOk: () => {
      window.open(
        'http://wpa.qq.com/msgrd?v=3&uin=1178522294&site=qq&menu=yes'
      );
    }
  });
};

/**
 * 获取编译后的markdown
 *
 * @param url 服务器请求路经
 * @param query 请求参数
 * @param ctx Vue组件对象指针
 * @param stateName 存储对象在state中的名称
 * @returns 是否继续导航
 */
const getCompiledMarkdown = async (
  url: string,
  query: any,
  ctx: Vue,
  stateName: string
  // eslint-disable-next-line max-params
) => {
  const store = ctx.$store;
  const docContent = store.state[stateName].path;
  let navigate = true;

  if (!docContent)
    // if the markdown file hasn't been download yet, download now and cache it
    await axios
      .post(`${url}.php`, query)
      .then(response => {
        if (response.data === 'file not found') {
          /*
           * markdown file unexist
           * cancel navigate and show alert
           */
          navigate = false;
          myAlert(ctx);
        } // store the parsed markdown file to Vuex
        else store.commit(stateName, [query.path, marked(response.data)]);
      })
      .catch(err => {
        /*
         * nomally caused by network
         * cancel navigate and show alert with error msg
         */
        navigate = false;
        myAlert(ctx, true, err);
      });

  // return navigate condition
  return navigate;
};

export default getCompiledMarkdown;
