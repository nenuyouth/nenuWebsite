<template>
  <div class="vue_viewer" ref="viewer">
    <template v-if="$slots.default">
      <slot/>
    </template>
    <template v-else>
      <div :key="index" class="vue_viewer_item" v-for="(item, index) in list" v-show="false">
        <img :alt="item.title" :src="item.url" v-if="(item instanceof Object)">
        <img :src="item" v-else>
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

  @Prop(Number) private readonly value!: number;

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

    this.closed = this.visible;
  }

  private viewerInit() {
    Viewer.setDefaults({
      initialViewIndex: 0,
      navbar: 1,
      title: 1,
      toolbar: {
        reset: { show: false },
        rotateLeft: { show: false },
        rotateRight: { show: false },
        flipHorizontal: { show: false },
        flipVertical: { show: false }
      },
      movable: true,
      rotatable: true,
      interval: 3000,
      zIndex: 200,
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
