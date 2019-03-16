# 对象

> Mr.Hope最后编辑于2018/10/24

在JavaScript的世界里，一切都是对象。

但是某些对象还是和其他对象不太一样。为了区分对象的类型，我们用typeof操作符获取对象的类型，它总是返回一个字符串：

```js
typeof 123; // 'number'
typeof NaN; // 'number'
typeof 'str'; // 'string'
typeof true; // 'boolean'
typeof undefined; // 'undefined'
typeof Math.abs; // 'function'
typeof null; // 'object'
typeof []; // 'object'
typeof {}; // 'object'
```

可见，`number`、`string`、`boolean`、`function`和`undefined`有别于其他类型。特别注意`null`的类型是`object`，`Array`的类型也是`object`，如果我们用`typeof`将无法区分出`null`、`Array`和通常意义上的object——`{}`。

---

## 标准对象

- ## [包装对象](object/wrap)

- ## [Date对象](object/date)

- ## [正则表达](object/regExp)

- ## [JSON](object/JSON)

---

## 面向对象编程

- ## [对象及原型介绍](object/intro)

- ## [创建对象](object/create)

- ## [原型继承](object/inherit)

- ## [class继承](object/class)