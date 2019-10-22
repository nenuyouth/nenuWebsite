/*
 * @Author: Mr.Hope
 * @Date: 2019-06-20 19:34:52
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-06-25 10:00:57
 * @Description: 多界面配置
 */

const fs = require('fs');
const path = require('path');

const fileNames = fs.readdirSync(path.resolve(__dirname, './src/pages'));
const MutiPageConfig = { index: './src/main.ts' };

fileNames.forEach(pageName => {
  MutiPageConfig[pageName] = {
    // page 的入口
    entry: `src/pages/${pageName}/main.ts`,
    // 模板来源
    template: 'public/index.html',
    // 在 dist 的输出
    filename: `${pageName}.html`
  };
});

module.exports = MutiPageConfig;
