# JavaScript引入、编写、运行与调试

## 引入JS

JavaScript代码可以直接嵌在网页的任何地方。

如果想要在网页显示前就载入并运行JavaScript，通常我们把代码放到`<head>`中，如图：

```html
<html>
<head>
  <script>
    alert('Hello, world');
  </script>
</head>
<body>
  ...
</body>
</html>
```

由`<script>...</script>`包含的代码就是JavaScript代码，它将直接被浏览器执行。

第二种方法是把JavaScript代码放到一个单独的`js`文件，然后在HTML中通过`<script src="..."></script>`引入这个文件：

```html
<html>
<head>
  <script src="/static/js/abc.js"></script>
</head>
<body>
  ...
</body>
</html>
```

这样，`/static/js/abc.js`就会被浏览器执行。

把JavaScript代码放入一个单独的.js文件中更利于维护代码，并且多个页面可以各自引用同一份`js`文件。

可以在同一个页面中引入多个.js文件，还可以在页面中多次编写`<script> js代码... </script>`，浏览器按照顺序依次执行。

如果网页是静态的，希望尽快向用户呈现，可以将JavaScript代码放在文件的租后。

因为<`script>`标签默认的`type`就是JavaScript，所以下方的写法是没有必要的。

```html
<script type="text/javascript">
  ...
</script>
```

## 编写JS

可以用任何文本编辑器来编写JavaScript代码。这里推荐Visual Studio Code。

## 运行JS

要让浏览器运行JavaScript，必须先有一个HTML页面，在HTML页面中引入JavaScript，然后，让浏览器加载该HTML页面，就可以执行JavaScript代码。

直接在硬盘上创建好HTML和JavaScript文件，然后用浏览器打开的方式运行部分JavaScript代码没有问题，但由于浏览器的安全限制，以`file://`开头的地址无法执行如联网等JavaScript代码，

最好的运行JavaScript的方法是架设一个Web服务器，然后以`http://`或`https://`开头的地址来正常执行所有JavaScript代码。本地服务器最好使用Apache2.4.

## 调试JS

写JavaScript的时候，如果期望显示`ABC`，结果却显示`XYZ`，找出问题代码，这就需要调试。

怎么在浏览器中调试JavaScript代码呢？

首先，安装Google Chrome浏览器，Chrome浏览器对开发者非常友好，可以方便地调试JavaScript代码。

安装后，在调试的网页上直接按`F12`就可以进入到开发者工具模式。

先点击“控制台(Console)“，在这个面板里可以直接输入JavaScript代码，按回车后执行。

要查看一个变量的内容，在Console中输入`console.log(a)`;，回车后显示的值就是变量的内容。

关闭Console请点击右上角的“×”按钮。请熟练掌握Console的使用方法，在编写JavaScript代码时，经常需要在Console运行测试代码。

开发者工具的“源码(Sources)”，可以提供更高级的操作，比如断点、单步执行等高级调试技巧。
