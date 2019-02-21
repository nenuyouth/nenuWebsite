# SetPage JS插件的使用

> 作者: Mr.Hope最后编辑于: 2018/12/03

SetPage.js是Mr.Hope本人自己编写的库。Mr.Hope对任何抄袭、商用行为采取零容忍态度。

## 插件的引入

首先在`js`文件头部声明`js`的引入。

```js
var S = require(js文件的相对路径/setPage.js)
```

## 函数库

### preLoad()

**用法**：

preload用于将界面内连接进行预加载，对page中所有aim值生成对应的json。

函数在运作时会调用getOnlinePage()。

**语法**：

```js
preLoad(indicator, globalData)

S.preload(this,a)//通常用法
```

| 参数 | 描述 | 一般值 |
|-|-|:-:|
|indicator|传入界面的指针|this|
|globalData|传入全局数据g|a|

**函数性质**：

异步函数，无返回值。

### presetPage()

**用法**：

presetPage用于onNavigate时预加载页面，读取本地界面json数据并将数据写入初始数据。

**语法**：

```js
presetPage(page, globalData, option, indicator, Set)

S.presetPage(page,a,opt,indicator,set)//通常用法
```

| 参数 | 描述 | 一般值 |
|-|-|:-:|
|page|页面数据|this.data.page|
|indicator|界面的指针|this|
|globalData|globalData|a|

**返回值**：

同步函数，无返回值。对当前页面写入属性`aim`，值为界面的`aim`值。

- ### getPageData()

**用法**：

getPageData在onNavigate时调用，将界面数据写入初始数据，用于对界面数据进行处理并写入data中。

**语法**：

```js
getPageData(page, globalData, option)

S.getPageData(this.data.page, a, opt)//通常用法
```

| 参数 | 描述 | 一般值 |
|-|-|:-:|
|indicator|界面的指针|this|
|globalData|globalData|a|

**返回值**：

该页面对应的aim值，当不存在aim值时返回false。