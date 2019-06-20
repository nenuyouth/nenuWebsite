/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Hightlight.js 配置文件
 * @Date: 2019-05-06 01:30:09
 * @LastEditTime: 2019-05-06 12:26:26
 */

import hljs from 'highlight.js/lib/highlight';

// tslint:disable: no-var-requires
hljs.registerLanguage('apache', require('highlight.js/lib/languages/apache'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('basic', require('highlight.js/lib/languages/basic'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
hljs.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'));
hljs.registerLanguage('dos', require('highlight.js/lib/languages/dos'));
hljs.registerLanguage('handlebars', require('highlight.js/lib/languages/handlebars'));
hljs.registerLanguage('htmlbars', require('highlight.js/lib/languages/htmlbars'));
hljs.registerLanguage('ini', require('highlight.js/lib/languages/ini'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
hljs.registerLanguage('less', require('highlight.js/lib/languages/less'));
hljs.registerLanguage('php', require('highlight.js/lib/languages/php'));
hljs.registerLanguage('plaintext', require('highlight.js/lib/languages/plaintext'));
hljs.registerLanguage('properties', require('highlight.js/lib/languages/properties'));
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'));
hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'));
hljs.registerLanguage('tex', require('highlight.js/lib/languages/tex'));
hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));
hljs.registerLanguage('vbscript', require('highlight.js/lib/languages/vbscript'));
hljs.registerLanguage('vbscript-html', require('highlight.js/lib/languages/vbscript-html'));

export default hljs;
