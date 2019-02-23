# Vue开发环境安装

> 作者：Mr.Hope 最后编辑于18/12/18

## Node.js环境安装

请先安装Node.js并将npm与node添加至path。

- [安装Node.js](/doc/software/nodeJS/install)
- [添加到path](/doc/basic/addPath)

## 初始化版本库、下载网页代码并安装npm模块

1. 在合适位置新建文件夹并使用`git init`命令初始化git repo。

2. 在文件管理器中的地址栏输入cmd，以在当前界面打开终端。

3. 使用`git remote add origin git@gitee.com/nenuStudentUnion/website.git`添加远程库。

4. 使用`git pull origin`命令，从远程库拉取最新代码。

    > 拉取代码前请确认已经生成本机密钥并添加至码云公共账号中。添加方法详见[此处](/doc/software/git/remote)

5. 使用`git checkout master`命令切换到主分支上。

6. 使用`npm install`命令安装模块(。

7. 使用`npm install -g @vue/cli`命令全局安装vue-cli3

8. 使用`npm install -g ncu`命令全局安装node模块更新检查器(可选)

    使用`npm install -g npx`命令全局安装node模块命令执行器(可选)

9. 使用`npm install -g eslint`命令全局安装eslint代码检查器(可选)

> [npm模块介绍](/doc/software/nodeJS/module)

## 开发工具安装

Vue官方提供的浏览器插件VueTools可以更好的帮助开发。

使用VPN用chrome打开[安装网址](https://chrome.google.com/webstore/detail/nhdogjmejiglipccpnnnanhbledajbpd)，安装VueTools开发工具

> VPN推荐赛风3，点[此处](https://nenuyouth.com/Res/exe/psiphon3.exe)下载