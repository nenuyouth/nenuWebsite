<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 图片浏览器
 * @Date: 2019-04-26 12:05:30
 * @LastEditTime: 2019-11-19 00:06:19
-->
<template>
  <div ref="viewer" class="vue_viewer">
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <div v-for="(item, index) in list" :key="index" class="vue_viewer_item">
        <img v-if="item instanceof Object" :alt="item.title" :src="item.url" />
        <img v-else :src="item" />
      </div>
    </template>
  </div>
</template>
<script lang="ts">
// 引入ViewJS样式
import "viewerjs/dist/viewer.css";

import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Viewer from "viewerjs";

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
  flipVertical: 1,
};

enum Visibility {
  Hidden = 0,
  Visible = 1,
  VisibleOnMediumOrWiderScreen = 2,
  VisibleOnLargeOrWiderScreen = 3,
  VisibleOnExtraLargeOrWiderScreen = 4,
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
  @Prop({ type: [Boolean, Number], default: 1 }) private readonly navbar!:
    | boolean
    | number;

  // 标题的可见性 0/false：隐藏，1/true：显示，2：屏幕宽度大于768像素时显示，3：屏幕宽度大于992像素时显示，4：屏幕宽度大于1200像素时显示, Function: 自定义标题内容，[Number, Function]： Function(image, imageData)
  @Prop({ type: [Boolean, Number, Function, Array], default: 1 })
  private readonly title!:
    | boolean
    | number
    | [Visibility, Function]
    | Visibility;

  // 工具栏的可见性 0/false：隐藏，1/true：显示，2：屏幕宽度大于768像素时显示，3：屏幕宽度大于992像素时显示，4：屏幕宽度大于1200像素时显示
  @Prop({ type: [Boolean, Number], default: 1 }) private readonly toolbarType!:
    | boolean
    | number
    | object;

  // 工具栏按钮的可见性和布局
  @Prop(Object) private readonly toolbarOptions!: object;

  // 放大或缩小时图像比率（百分比）提示
  @Prop({ type: Boolean, default: true })
  private readonly tooltipShow!: boolean;

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
  @Prop({ type: [Boolean, String], default: true })
  private readonly backdrop!: boolean;

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
  @Prop({ type: [String, Function], default: "src" }) private readonly url!:
    | string
    | Function;

  // 插入位置
  @Prop({ type: [Element, String], default: "body" })
  private readonly container!: any;

  // 过滤器
  @Prop({ type: Function, default: () => true }) private readonly filter!: any;

  // 双击功能
  @Prop({ type: Boolean, default: true })
  private readonly toggleOnDblclick!: any;

  @Prop(Number) private value!: number;

  // 图片列表
  private list: string[] = [];

  // 图片的索引值
  private index = 0;

  private toolbar: number | boolean | object = toolbarDefaultOption;

  private closed = false;

  private photo = [
    { url: "https://dummyimage.com/100x100", title: "哈哈哈" },
    "https://dummyimage.com/110x110",
    "https://dummyimage.com/120x120",
  ];

  private viewerVal = 0;

  private isShow = false;

  private get viewerOptions() {
    return {
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
      shown: (event: CustomEvent) => {
        // 显示事件-结束
        this.closed = true;
        this.$emit("viewer:shown", event);
        this.$emit("viewer:update", true);
      },
      viewed: (event: CustomEvent) => {
        // 切换事件-结束
        this.index = event.detail.index;
        this.$emit("viewer:viewed", event);
      },
    };
  }

  // 初始化选项
  private optionsInit() {
    this.list = typeof this.images === "string" ? [this.images] : this.images;

    this.index = this.value;
    this.toolbar = this.toolbarOptions
      ? { ...toolbarDefaultOption, ...this.toolbarOptions }
      : this.toolbarType;

    this.closed = this.visible;
  }

  private viewerInit() {
    Viewer.setDefaults(this.viewerOptions);

    viewer = new Viewer(this.$refs.viewer as Element);
    if (this.visible) viewer.show();
  }

  private created() {
    this.optionsInit();
    this.$nextTick(() => {
      this.viewerInit();
    });
  }

  @Watch("images")
  private onImagesChange() {
    this.$nextTick(() => {
      viewer.update();
    });
  }

  @Watch("visible")
  private onVisibleChange(newVal: boolean) {
    if (this.closed === newVal) return;
    this.closed = newVal;
    if (newVal) viewer.show();
    else viewer.hide();
  }

  @Watch("index")
  private onIndexChange() {
    this.$emit("input", this.index);
  }

  @Watch("value")
  private onValueChange() {
    if (!this.value && this.value !== 0) return;

    // 切换到图像到索引的图像位置，如果未显示灯箱，将首先显示灯箱。index = 索引
    viewer.view(this.value);
  }

  private beforeDestroy() {
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
