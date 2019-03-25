# vscode介绍

> 作者：Mr.Hope 最后编辑于2019/03/25

## 简介

这是一款微软的代码编辑器，因其开源，可扩展和众多插件成为全球最受欢迎的代码编辑器。

## vscode的安装

在[官网下载地址](https://code.visualstudio.com/Download)下载最新版Win64User安装包，双击安装包打开同意用户协议，勾选添加到目录上下文菜单、将code注册为受支持的文件编辑器、添加到path。

在vscode初次启动后，若未提前安装git可能会提示未找到git软件，忽略即可；推荐简体中文扩展安装以保证界面语言为简体中文。

## 关于vscode界面

vscode最上方有一排菜单栏，其中有大量的快捷操作，对应的组合键会标于快捷操作旁。如果不能记忆快捷键可以到最上方的菜单栏处查看。

最左侧是选项卡切换，从上至下依次是[资源管理器](#资源管理器)、[搜索](#搜索)、[源代码管理](#源代码管理)、[调试](#调试)和[扩展](#扩展)。

最下方的一条是状态栏。从左到右依次是分支名称、同步状态、错误和警告个数、光标位置、缩进大小、编码格式、行尾序列、文件格式、反馈和通知。

- ### 资源管理器

    资源管理器是最常使用的界面，快捷键为`Ctrl`+`Shift`+`E`。

- ### 搜索

    搜索界面可以方便的对打开文件夹内的所有文本型文件进行关键字的搜索。搜索结果会详细的列出来，搜索内容支持正则表达式，快捷键为`Ctrl`+`Shift`+`F`。

- ### 源代码管理

    源代码管理提供快速暂存、提交并同步更改的功能，快捷键为`Ctrl`+`Shift`+`G`。

    关于源代码相关功能的使用，请见[git使用说明](git)。

- ### 调试

    在这里可以调试代码，快捷键为`Ctrl`+`Shift`+`D`。(日后补充)

- ### 扩展组件

    在商店中可以找到大量的扩展，快捷键为`Ctrl`+`Shift`+`X`。尽量选择一些star数比较高的插件安装。安装插件后请仔细阅读说明文档以了解插件的用法。

## 扩展

下面是推荐的扩展安装列表：

扩展可以通过按`F1`或者`Ctrl + Shift + P`来打开命令行窗口，并输入`ext install 扩展名称`来进行安装

[VSCode推荐扩展](vscode/vscodeExtension)

## 用vscode打开文件和文件夹

vscode支持打开文件和文件夹。

打开文件时请在文件图标上单击右键—选择使用vscode打开；

打开文件夹请双击打开文件夹，在空白处单击右键——选择用vscode打开。

## vscode快捷键

- ### 快速选中：

    在任意位置单击放置光标，按住shift在第二个位置单击，即可选中两光标位置间的所有文字。

    Ctrl + Alt + ↑/↓：向方向键方向的相邻行放置一个光标；

    Alt + Click：放置辅助游标；

    Shift + Alt + ←/→：收缩/扩展选择；

    Shift + Alt，同时拖动到对角：列（框）选择；

- ### 移动文字：

    Alt + ↑：光标所在行或选中的文字的所有行整体上移一行；

    Alt + ↓：光标所在行或选中文字的所有行整体下移一行

- ### 复制文字：

    Alt + shift + ↑：光标所在行或选中的文字的所有行整体向下复制一行(如果选中了多行就是复制多行)；

    Alt + shift + ↓：光标所在行或选中文字的所有行整体向上复制一行(如果选中了多行就是复制多行)；

    Ctrl + D：选择光标处的单词，或下一次出现的当前选择；

- ### 格式化代码：

    Alt + shift + F

- ### 代码折叠：

    Ctrl + Shift + [：折叠光标处最内部的未折叠区域；

    Ctrl + Shift +]：展开光标处的折叠区域；

    Ctrl + K Ctrl + [：折叠光标处最内部的未折叠区域以及该区域内的所有区域；

    Ctrl + K Ctrl +]：展开光标处的区域以及该区域内的所有区域；

    Ctrl + K Ctrl + 0：折叠编辑器中的所有区域；

    Ctrl + K Ctrl + J：展开编辑器中的所有区域；

    Ctrl + K Ctrl + `X`：折叠级别`X`的所有区域，但当前光标位置的区域除外；

    Ctrl + K Ctrl + /：折叠以块注释标记开头的所有区域；

- ### 其他Windows快捷键：

    Ctrl + X：剪切；

    Ctrl + C：复制；

    Ctrl + V：粘贴；

    Ctrl + A：全选；

    Ctrl + Z：撤销；

    Ctrl + Y：恢复；

    Ctrl + F：查找；

    Ctrl + H：替换。

    > 更多请见
    >
    > [Windows快捷键介绍](/doc/windows/shortCutKey)
    >
    > [VScode快捷键介绍](https://nenuyouth.com/document/software/vscode/vscodeKeyboardShortcutsWindows.pdf)

## VScode设置

[点击此处](vscode/vscodeSettings)

## VScode文档

- ### [官方文档](https://code.visualstudio.com/docs)

- ### [官方视频](https://code.visualstudio.com/docs/getstarted/introvideos)