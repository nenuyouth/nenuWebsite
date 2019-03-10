# 安装Node.js和npm

由于Node.js平台是在后端运行JavaScript代码，所以，必须首先在本机安装Node环境。

## 安装Node.js

目前Node.js的最新的LTS版本是10.15.1。首先，从Node.js官网下载对应平台的安装程序。[Windows下载地址](https://nodejs.org/dist/v10.15.1/node-v10.15.1-x64.msi)

- 在Windows上安装时务必选择全部组件，包括勾选`Add to Path`。

  安装完成后，在Windows环境下，请打开命令提示符，然后输入`node -v`，如果安装正常，你应该看到v11.4.0这样的输出：

  ```cmd
  C:\Users\IEUser>node -v
  v10.15.1
  ```

  继续在命令提示符输入node，此刻你将进入Node.js的交互环境。在交互环境下，你可以输入任意JavaScript语句，例如`100+200`，回车后将得到输出结果。

  要退出Node.js环境，连按两次`Ctrl+C`。

- 在Mac或Linux环境下，请打开终端，然后输入`node -v`，你应该看到如下输出：

  ```shell
  $ node -v
  v10.15.1
  ```

> 如果版本号小于v10.15.1，说明Node.js版本较低，请重新安装最新版本。

## npm

在正式开始Node.js学习之前，我们先认识一下npm。

npm是什么东东？npm其实是Node.js的包管理工具（package manager）。

为啥我们需要一个包管理工具呢？因为我们在Node.js上开发时，会用到很多别人写的JavaScript代码。如果我们要使用别人写的某个包，每次都根据名称搜索一下官方网站，下载代码，解压，再使用，非常繁琐。于是一个集中管理的工具应运而生：大家都把自己开发的模块打包后放到npm官网上，如果要使用，直接通过npm安装就可以直接用，不用管代码存在哪，应该从哪下载。

更重要的是，如果我们要使用模块A，而模块A又依赖于模块B，模块B又依赖于模块X和模块Y，npm可以根据依赖关系，把所有依赖的包都下载下来并管理起来。否则，靠我们自己手动管理，肯定既麻烦又容易出错。

讲了这么多，npm究竟在哪？

其实npm已经在Node.js安装的时候顺带装好了。我们在命令提示符或者终端输入npm -v，应该看到类似的输出：

```shell
C:\>npm -v
6.8.0
```

> 如果版本号小于v6.8.0，说明npm版本较低，请使用此命令升级到最新版本：`npm install -g npm`。

如果直接输入npm，你会看到类似下面的输出：

```shell
C:\> npm

Usage: npm <command>

where <command> is one of:
    ...
```

上面的一大堆文字告诉你，npm需要跟上命令。现在我们不用关心这些命令，后面会一一讲到。目前，你只需要确保npm正确安装了，能运行就行。

## 墙

大家都知道天朝是有墙的，有的时候，访问国外的nodeJS服务器可能会十分缓慢以至于你想把它砸了。

所以贴心的马云爸爸提供了淘宝镜像，淘宝镜像有一个自己定制的`cnpm`工具，服务器在国内，十分快捷。不过大家在使用`cnpm`安装模块之后再使用npm安装会报错，只能重新删掉`node_modules`文件夹重新执行`npm install`全新安装才会不报错。

安装`cnpm`的命令如下：

```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## 小结

请在本机安装Node.js环境，并确保node和npm能正常运行。