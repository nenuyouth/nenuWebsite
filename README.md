# NENU StudentUnion Website

> 本项目采用GNU General Public License version 3，使用前请务必注意条款。

该项目使用Node.js，基于Vue框架制作

## 组件介绍与使用手册

查看[自定义组件文档](/tree/master/public/Res/doc/website/vue/component.md)

## Node.js库使用

### 项目使用库

#### Vue官方库

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
- marked(提供md转html)
- github-markdown-css(提供github md样式)
- mavon-editor(markdown网页编辑器)
- register-service-worker
- vue-wechat-title(设置网页标题)

#### CDN引入

- jquery3
- popper.js
- bootstrap4(bootstrap栅格系统)

> 目前暂时取消使用了vue-wechat-title

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

## 初始化项目

```shell
npm install
```

## 更新项目依赖

```shell
npm update
```

或

```shell
npm install
```

### 启动开发环境

```shell
npm run serve
```

或

```shell
npm run dev
```

> 运行开发环境，可在浏览器通过[http://localhost:8080](http://localhost:8080)直接访问。
> 使用`ctrl + c`组合键并输入`y`再回车来终止开发环境

### 构建生产环境

```shell
npm run build
```

> 执行构建，将构建成功的网页输出至/dist目录

#### 执行文件提示和文件修复

```shell
npm run lint
```

与

```shell
npm run eslint
```

### 自定义配置

查看 [自定义配置](https://cli.vuejs.org/zh/config/).
