# NENU StudentUnion Website

[![作者：Mr.Hope](https://img.shields.io/badge/作者-Mr.Hope-blue.svg)](https://mrhope.nenuyouth.com)
[![Travis CI](https://travis-ci.com/nenuyouth/nenuWebsite.svg?branch=work)](https://travis-ci.com/nenuyouth/nenuWebsite)
[![Netlify Status](https://api.netlify.com/api/v1/badges/f900457b-a946-4874-9fc9-ddf41395417c/deploy-status)](https://app.netlify.com/sites/silly-ramanujan-8600f8/deploys)

> 本项目并没有附加任何开源协议，请避免使用、改编、移植任何源码

该项目使用Node.js，基于Vue框架制作。→ [点击前往](https://nenuyouth.com/) | [备用地址](https://nenuyouth.netlify.com)

## 使用提示

直接克隆本项目即可。

- [更多详情](#项目使用说明)

## 组件介绍与使用手册

查看[自定义组件文档](https://nenuyouth.com/doc/private/website/vue/component)

## 待做

### Doc

- doc添加本地缓存

- 密码缓存

### 功能

- BaseDoc

- 添加校园通讯录功能

### Viewjs

完善并加入

### 在线编辑

完善json和markdown的在线编辑功能。

## 别名设置

- @：`src/`
- \#：`src/components`
- |：`src/assets`
- %：`src/utils`

## Linter配置

启动项目之后，请在VSCode中安装Eslint插件并严格按照Linter提示格式化代码。

项目不应包含任何无法通过Linter配置检查的代码。

## Node.js库使用

### 项目使用库

#### Vue官方库

> 跟进使用最新版官方库

- @vue/cli
- vue
- vue-router
- vue-class-component
- vue-property-decorator
- vuex

#### 第三方库

- ant-design-vue(Ant-design样式库)
- axios(基于promise的html访问功能)
- highlight.js(提供md代码高亮)
- jQuery(提供快速的DOM操作)
- marked(提供md转html)
- github-markdown-css(提供github md样式)
- mavon-editor(markdown网页编辑器)
- register-service-worker
- vue-wechat-title(设置网页标题)

#### CDN引入

- Vue
- Vuex
- Vue-Router
- Viewerjs
- Tinycolor2
- Axios
- jQuery

### 开发依赖

#### Vue-cli相关

- @vue/cli-plugin-babel
- @vue/cli-plugin-pwa
- @vue/cli-service

#### 代码打包相关

- babel-plugin-import
- fibers

#### 开发语言相关

- vue-template-compiler(vue单文件编译器)
- less
- less loader
- sass
- sass-loader
- typescript
- @types/highlight.js
- @types/jquery
- @types/marked

#### 代码检查与格式化工具

- eslint
- eslint-plugin-vue
- babel-eslint
- @vue/cli-plugin-eslint
- @vue/eslint-config-airbnb
- @vue/eslint-config-typescript
- tslint
- tslint-config-airbnb
- @vue/cli-plugin-typescript

#### 其他在package.json移除但在lib中改进并使用的库

> 需要定期注意更新

- bootstrap@4.3.1
- weui@2.0.1

## 项目使用说明

### 下载项目

使用Git clone操作。

- [Git克隆相关说明](https://nenuyouth.com/doc/private/software/git/remote)

具体步骤：

在本机找到一个合适的位置，在文件资源管理器的地址输入`cmd`后回车打开命令提示符。

执行命令：

```shell
git clone git@github.com:GodofHope/nenuWebsite.git
```

在项目完成后推荐使用vscode打开并查看项目。

### 初始化项目

```bash
npm install
```

> 需要先安装Node.js
>
> - 更多[Nodejs说明](https://nenuyouth.com/doc/private/software/nodeJS)

## 更新项目依赖

```bash
npm update
```

或

```bash
npm install
```

### 启动开发环境

```bash
npm run serve
```

> 运行开发环境，可在浏览器通过[http://localhost:8080](http://localhost:8080)直接访问。
>
> 使用`ctrl + c`组合键并输入`y`再回车来终止开发环境
>
> 推荐使用VSCode
>
> - 更多[VSCode说明](https://nenuyouth.com/doc/private/software/vscode)

### 构建生产环境

- 构建现代输出（ES5标准支持，有fallback）

  ```bash
  npm run build
  ```

- 构建常规输出（ES5标准支持，有fallback）

  ```bash
  npm run normBuild
  ```

> 执行构建，将构建成功的网页输出至/dist目录

- 重新构建（现代 | 常规），不清空输出目录原内容

  ```bash
  npm run rebuild
  ```

  ```bash
  npm run normRebuild
  ```

### 执行文件提示和文件修复

```bash
npm run lint
```

### 分析打包文件

- 分析现代构建打包

  ```bash
  npm run analyze
  ```

- 分析普通构建打包

  ```bash
  npm run normAnal
  ```

### 查看浏览器支持

```bash
npm run browser
```

### 输出Webpack模式打包配置

- 输出现代构建打包配置至当前目录的moderm.js

  ```bash
  npm run inspect
  ```

- 输出普通构建打包配置至当前目录的normal.js

  ```bash
  npm run normInspect
  ```

#### 执行测试

- e2e(端对端)测试

  ```bash
  npm run e2e
  ```

- 单元测试(unit test)

  ```bash
  npm run unit
  ```

## 相关文档

- [Vue](https://nenuyouth.com/doc/private/website/vue)
