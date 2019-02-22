# Vue与小程序的异同

> 作者：Mr.Hope 最后编辑于2019/02/22

Vue-cli提供的vue单文件语法与小程序基本相似，甚至可以说小程序是改变自Vue与React框架的。

## 优缺点比较

|        | 优点                                                                                                                                                                       | 缺点                                                                                                                                                                                                                                                                          |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 小程序 | 小程序底层由微信框架驱动，每个界面是单独的JS文件，页面切换以及全局生命周期丰富完善。小程序具有相当完备的API。                                                              | 小程序是由JSCore驱动逻辑层，视图层采用Webview，故没有DOM节点的概念，只有渲染出的虚拟节点，所以无法动态删除或添加节点，无法使用一切DOM相关API。小程序组件生命周期不够强大。小程序的Webview渲染存在一定的性能问题。小程序视图层与逻辑层通过Jsbridge连接，数据传输及渲染有延时。 |
| vue    | Vue的实质是动态监测并托管DOM节点。由于Vue是网页开发，拥有DOM树，可以使用DOM相关API。Vue组件拥有更全面的生命周期，同时可以动态渲染组件。Vue的组件传递数据方式默认为单向绑定 | 由于Vue的组件本质是监测DOM树，故其组件只能有一个根节点。同时Vue的界面路由依赖于History API，其界面切换周期与逻辑不够强大。                                                                                                                                                    |

## 代码区别

小程序与Vue在代码写法上极其相似，但稍有不同。

### 动态数据绑定写法

#### 小程序动态数据绑定写法

```html
<view class="text1 {{a}} {{b?:'b为真':'b为假'}}">{{text}}</view>
```

> 小程序在所有内容上都使用Muscle语法(`{{Javascript表达式}}`)的写法。

#### Vue动态数据绑定写法

```html
<div class="text1" :class="a+' '+ b?:'b为真':'b为假'">{{text}}</div>
```

> Vue在标签名属性用`v-bind:prop="Javascript表达式"`的写法、其简写为`:prop=""`，在标签内容处使用Muscle语法。

### 条件渲染写法

#### 小程序条件渲染写法

```html
<view wx:if="{{condition1}}">板块只有condition1为true时才会渲染</view>


<block wx:if="{{condition2}}">
  <view>内容1</view>
  <view>内容2</view>
  <view>
    <view>内容3</view>
    <view>内容4</view>
  </view>
  <view>
    这是一个拥有很多兄弟标签的代码块.
    虚拟标签block会把其当作一个整体用作条件渲染。
  </view>
</block>
```

> 更多详情请见[小程序条件渲染文档](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/conditional.html)

#### Vue条件渲染写法

```html
<div v-if="condition">板块只有condition为true时才会渲染</div>

<div v-if="{{condition2}}">
  <div>内容1</div>
  <div>内容2</div>
  <div>
    <div>内容3</div>
    <div>内容4</div>
  </div>
  <div>
    Vue没有相关虚拟标签，且只能监听一个标签。
    所以只能建立一个没有样式的div标签将多个并列标签抱起来。
    这样Vue就会因监听最外层div会把其当作一个整体用作条件渲染。
  </div>
</div>
```

> 更多相关请见[Vue条件渲染文档](https://cn.vuejs.org/v2/guide/#%E6%9D%A1%E4%BB%B6%E4%B8%8E%E5%BE%AA%E7%8E%AF)

### 循环渲染写法

#### 小程序循环渲染写法

```html
<view wx:for="{{array}}" wx:for-item="element" wx:for-index="index">
  {{index}} is {{element}}
</view>
```

> 实际渲染结果为：
> ```html
> <view>1</view>
> <view>2</view>
> <view>3</view>
> <view>4</view>
> <view>5</view>
> ```

> ``更多详情请见[小程序循环渲染文档](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/list.html)

#### Vue循环渲染写法

```html
<div>
    <div v-for="(element,index) in array">
       {{index}} is {{ element }}
    </div>
  </ol>
</div>
```

> 更多相关请见[Vue循环渲染文档](https://cn.vuejs.org/v2/guide/#%E6%9D%A1%E4%BB%B6%E4%B8%8E%E5%BE%AA%E7%8E%AF)

## 生命周期

### 页面生命周期

#### 小程序生命周期

![小程序页面生命周期](https://developers.weixin.qq.com/miniprogram/dev/image/mina-lifecycle.png?t=19021516)

#### Vue页面生命周期

[Vue页面生命周期](https://router.vuejs.org/guide/advanced/navigation-guards.html)

### 组件生命周期

#### 小程序组件生命周期

[小程序组件生命周期](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/lifetimes.html)

#### Vue组件生命周期

![Vue组件生命周期](https://cn.vuejs.org/images/lifecycle.png)