<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 图片浏览器
 * @Date: 2019-04-26 12:05:30
 * @LastEditTime: 2019-07-01 22:59:24
-->
<template>
  <div ref="viewer" class="vue_viewer">
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <div v-for="(item, index) in list" :key="index" class="vue_viewer_item">
        <img v-if="(item instanceof Object)" :alt="item.title" :src="item.url" />
        <img v-else :src="item" />
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import Viewer from 'viewerjs';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// 引入ViewJS样式
import 'viewerjs/dist/viewer.css';

const toolbarDefaultOption: Viewer.ToolbarOptions = {
  zoomIn: 1,
  zoomOut: 1,
  oneToOne: 1,
  reset: 1,
  prev: 1,
  play: 1,
  next: 1,
  rotateLeft: 1,
  rotateRight: 1,
  flipHorizontal: 1,
  flipVertical: 1
};

enum Visibility {
  Hidden = 0,
  Visible = 1,
  VisibleOnMediumOrWiderScreen = 2,
  VisibleOnLargeOrWiderScreen = 3,
  VisibleOnExtraLargeOrWiderScreen = 4
}

let viewer: Viewer;

@Component
export default class ImageViewer extends Vue {
  // 图片列表
  @Prop({ type: [String, Array] }) private readonly images!: string | string[];

  // 控制图片是否可见
  @Prop({ type: Boolean, default: false }) private readonly visible!: boolean;

  // 是否启用内联模式
  @Prop({ type: Boolean, default: false }) private readonly inline!: boolean;

  // 显示右上角的按钮
  @Prop({ type: Boolean, default: true }) private readonly button!: boolean;

  // 导航栏的可见性 0/false：隐藏，1/true：显示，2：屏幕宽度大于768像素时显示，3：屏幕宽度大于992像素时显示，4：屏幕宽度大于1200像素时显示
  @Prop({ type: [Boolean, Number], default: 1 }) private readonly navbar!: boolean | number;

  // 标题的可见性 0/false：隐藏，1/true：显示，2：屏幕宽度大于768像素时显示，3：屏幕宽度大于992像素时显示，4：屏幕宽度大于1200像素时显示, Function: 自定义标题内容，[Number, Function]： Function(image, imageData)
  @Prop({ type: [Boolean, Number, Function, Array], default: 1 }) private readonly title!:
    | boolean
    | number
    | [Visibility, Function]
    | Visibility;

  // 工具栏的可见性 0/false：隐藏，1/true：显示，2：屏幕宽度大于768像素时显示，3：屏幕宽度大于992像素时显示，4：屏幕宽度大于1200像素时显示
  @Prop({ type: [Boolean, Number], default: 1 }) private readonly toolbarType!: boolean | number | object;

  // 工具栏按钮的可见性和布局
  @Prop(Object) private readonly toolbarOptions!: object;

  // 放大或缩小时图像比率（百分比）提示
  @Prop({ type: Boolean, default: true }) private readonly tooltipShow!: boolean;

  // 是否可以移动图像
  @Prop({ type: Boolean, default: true }) private readonly movable!: boolean;

  // 是否可以放大缩小图像
  @Prop({ type: Boolean, default: true }) private readonly zoomable!: boolean;

  // 是否可以旋转图像
  @Prop({ type: Boolean, default: true }) private readonly rotatable!: boolean;

  // 是否可以翻转图像
  @Prop({ type: Boolean, default: true }) private readonly scalable!: boolean;

  // 是否启用transition
  @Prop({ type: Boolean, default: true }) private readonly transition!: boolean;

  // 是否可以查看原始图片大小
  @Prop({ type: Boolean, default: true }) private readonly fullscreen!: boolean;

  // 是否启用键盘
  @Prop({ type: Boolean, default: true }) private readonly keyboard!: boolean;

  // 是否启用遮罩，static不可点击遮罩关闭
  @Prop({ type: [Boolean, String], default: true }) private readonly backdrop!: boolean;

  // 加载图像时是否显示加载动画
  @Prop({ type: Boolean, default: true }) private readonly loading!: boolean;

  // 是否启用循环
  @Prop({ type: Boolean, default: true }) private readonly loop!: boolean;

  // 自动循环播放时间间隔
  @Prop({ type: Number, default: 5000 }) private readonly interval!: number;

  // 最小宽度
  @Prop({ type: Number, default: 5000 }) private readonly minWidth!: number;

  // 最小高度
  @Prop({ type: Number, default: 5000 }) private readonly minHeight!: number;

  // 鼠标缩放图像时的比率
  @Prop({ type: Number, default: 0.1 }) private readonly zoomRatio!: number;

  // 最小缩放图像比率
  @Prop({ type: Number, default: 0.01 }) private readonly minZoomRatio!: number;

  // 最大缩放图像比率
  @Prop({ type: Number, default: 100 }) private readonly maxZoomRatio!: number;

  // z-index值
  @Prop({ type: Number, default: 9999 }) private readonly zIndex!: number;

  // 内联模式z-index值
  @Prop({ type: Number, default: 100 }) private readonly zIndexInline!: number;

  // 占位图片
  @Prop({ type: [String, Function], default: 'src' }) private readonly url!: string | Function;

  // 插入位置
  @Prop({ type: [Element, String], default: 'body' }) private readonly container!: any;

  // 过滤器
  @Prop({ type: Function, default: () => true }) private readonly filter!: any;

  // 双击功能
  @Prop({ type: Boolean, default: true }) private readonly toggleOnDblclick!: any;

  @Prop(Number) private value!: number;

  // 图片列表
  private list: string[] = [];

  // 图片的索引值
  private index = 0;

  private toolbar: number | boolean | object = toolbarDefaultOption;

  private closed = false;

  private photo = [
    { url: 'https://dummyimage.com/100x100', title: '哈哈哈' },
    'https://dummyimage.com/110x110',
    'https://dummyimage.com/120x120'
  ];

  private viewerVal = 0;

  private isShow = false;

  // 初始化选项
  private optionsInit() {
    this.list = typeof this.images === 'string' ? [this.images] : this.images;

    this.index = this.value;
    this.toolbar = this.toolbarOptions ? { ...toolbarDefaultOption, ...this.toolbarOptions } : this.toolbarType;

    this.closed = this.visible;
  }

  private viewerInit() {
    Viewer.setDefaults({
      initialViewIndex: this.index,
      inline: this.inline,
      button: this.button,
      navbar: this.navbar,
      title: this.title,
      toolbar: this.toolbar,
      tooltip: this.tooltipShow,
      movable: this.movable,
      zoomable: this.zoomable,
      rotatable: this.rotatable,
      scalable: this.scalable,
      transition: this.transition,
      fullscreen: this.fullscreen,
      keyboard: this.keyboard,
      backdrop: this.backdrop,
      loading: this.loading,
      loop: this.loop,
      interval: this.interval,
      minWidth: this.minWidth,
      minHeight: this.minHeight,
      zoomRatio: this.zoomRatio,
      minZoomRatio: this.minZoomRatio,
      maxZoomRatio: this.maxZoomRatio,
      zIndex: this.zIndex,
      zIndexInline: this.zIndexInline,
      url: this.url,
      container: this.container,
      filter: this.filter,
      toggleOnDblclick: this.toggleOnDblclick,
      ready: event => {
        // 初始化ready事件
        this.$emit('ready', event);
      },
      show: event => {
        // 显示事件-开始
        this.$emit('show', event);
      },
      shown: event => {
        // 显示事件-结束
        this.closed = true;
        this.$emit('shown', event);
        this.$emit('update:visible', true);
      },
      hide: event => {
        // 隐藏事件-开始
        this.$emit('hide', event);
      },
      hidden: event => {
        // 隐藏事件-结束
        this.closed = false;
        this.$emit('hidden', event);
        this.$emit('update:visible', false);
      },
      view: event => {
        // 切换事件-开始
        this.$emit('view', event);
      },
      viewed: event => {
        // 切换事件-结束
        this.index = event.detail.index;
        this.$emit('viewed', event);
      },
      zoom: event => {
        // 缩放事件-开始
        this.$emit('zoom', event);
      },
      zoomed: event => {
        // 缩放事件-结束
        this.$emit('zoomed', event);
      }
    });

    viewer = new Viewer(this.$refs.viewer as Element);
    if (this.visible) this.show();
  }

  private created() {
    this.optionsInit();
    this.$nextTick(() => {
      this.viewerInit();
    });
  }

  @Watch('images')
  private onImagesChange() {
    this.$nextTick(() => {
      this.update();
    });
  }

  @Watch('visible')
  private onVisibleChange(newVal: boolean) {
    if (this.closed === newVal) return;
    this.closed = newVal;
    if (newVal) this.show();
    else this.hide();
  }

  @Watch('index')
  private onIndexChange() {
    this.$emit('input', this.index);
  }

  @Watch('value')
  private onValueChange() {
    if (!this.value && this.value !== 0) return;
    this.view(this.value);
  }

  private beforeDestroy() {
    this.destroy();
  }

  // 显示 immediate = 是否立即显示
  private show(immediate?: boolean) {
    viewer.show(immediate);

    return this;
  }

  // 隐藏 immediate = 是否立即隐藏
  private hide(immediate?: boolean) {
    viewer.hide(immediate);

    return this;
  }

  // 切换到图像到索引的图像位置，如果未显示灯箱，将首先显示灯箱。index = 索引
  private view(index: number) {
    viewer.view(index);

    return this;
  }

  // 上一张，如果未显示灯箱，将首先显示灯箱。 loop = 是否循环
  private prev(loop = false) {
    viewer.prev(loop);

    return this;
  }

  // 下一张，如果未显示灯箱，将首先显示灯箱。 loop = 是否循环
  private next(loop = false) {
    viewer.next(loop);

    return this;
  }

  // 移动 offsetX = '在水平方向上移动尺寸（px）', offsetX = '在垂直方向移动尺寸（px）， 不填默认与offsetX相同'
  private move(offsetX: number, offsetY?: number) {
    viewer.move(offsetX, offsetY);

    return this;
  }

  // 移动到 x = '在水平方向移动到（px）', y = '在垂直方向移动到（px）， 不填默认与x相同'
  private moveTo(x: number, y?: number) {
    viewer.moveTo(x, x);

    return this;
  }

  // 缩放 ratio = '缩放比例，正数放大，负数缩小'， hasTooltip = '是否显示提示'
  private zoom(ratio: number, hasTooltip = false) {
    viewer.zoom(ratio, hasTooltip);

    return this;
  }

  // 缩放到 ratio = '缩放到大小'， hasTooltip = '是否显示提示'
  private zoomTo(ratio: number, hasTooltip = false) {
    viewer.zoomTo(ratio, hasTooltip);

    return this;
  }

  // 旋转 ratio = '旋转角度，正数顺时针，负数逆时针'
  private rotate(degree: number) {
    viewer.rotate(degree);

    return this;
  }

  // 旋转到 ratio = '旋转到角度'
  private rotateTo(degree: number) {
    viewer.rotateTo(degree);

    return this;
  }

  // 拉伸 scaleX = '在水平方向上拉伸比例', scaleY = '在垂直方向拉伸比例， 不填默认与scaleX相同'
  private scale(scaleX: number, scaleY?: number) {
    viewer.scale(scaleX, scaleY);

    return this;
  }

  // 水平方向上拉伸 scaleX = '在水平方向上拉伸比例'
  private scaleX(scaleX: number) {
    viewer.scaleX(scaleX);

    return this;
  }

  // 垂直方向上拉伸 scaleY = '在垂直方向上拉伸比例'
  private scaleY(scaleY: number) {
    viewer.scaleY(scaleY);

    return this;
  }

  // 播放 fullscreen = '是否全屏'
  private play(fullscreen = false) {
    viewer.play(fullscreen);

    return this;
  }

  // 停止播放
  private stop() {
    viewer.stop();

    return this;
  }

  // 进入模态模式
  private full() {
    viewer.full();

    return this;
  }

  // 退出模态模式
  private exit() {
    viewer.exit();

    return this;
  }

  // 显示当前比例
  private tooltip() {
    viewer.tooltip();

    return this;
  }

  // 切换到在自然大小
  private toggle() {
    viewer.toggle();

    return this;
  }

  // 初始化
  private reset() {
    viewer.reset();

    return this;
  }

  // 更新
  private update() {
    viewer.update();

    return this;
  }

  // 销毁
  private destroy() {
    viewer.destroy();
  }
}
</script>
<style lang="scss">
.vue_viewer_item {
  display: inline-block;
  margin: 5px;
  img {
    width: 100px;
  }
}
</style>
