# Vue开发环境安装

> 作者：Mr.Hope 最后编辑于18/12/18

## Node.js环境安装

请先安装Node.js并将npm与node添加至path。

- [安装Node.js](/doc/software/nodeJS/install)
- [添加到path](/doc/basic/addPath)

## 初始化版本库并下载网页代码

新建文件夹并使用`git init`命令初始化git repo。

使用`git clone`命令复制vue版本库，版本库地址为`git@gitee.com/nenuStudentUnion/vueProject.git`。

> 克隆前请确认已经生成本机密钥并添加至码云公共账号中。添加方法详见[此处](/doc/software/git/remote)

## 安装npm模块

1. 使用vscode打开文件夹，打开终端(快捷键`Ctrl + 反引号`)。
2. 使用`npm install`命令安装模块
3. 使用`npm install -g @vue/cli`命令全局安装vue-cli3(可选)
4. 使用`npm install -g ncu`命令全局安装node模块更新检查器(可选)
5. 使用`npm install -g npx`命令全局安装node模块命令执行器(可选)

> [npm模块介绍](/doc/software/nodeJS/module)

## 开发工具安装

Vue官方提供的浏览器插件VueTools可以更好的帮助开发。

使用VPN用chrome打开[安装网址](https://chrome.google.com/webstore/detail/nhdogjmejiglipccpnnnanhbledajbpd)，安装VueTools开发工具

> VPN推荐赛风3，点[此处](https://nenuyouth.com/Res/exe/psiphon3.exe)下载