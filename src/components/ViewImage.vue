<template>
  <div class="vue_viewer" ref="viewer">
    <div :key="index" class="vue_viewer_item" v-for="(item, index) in list" v-show="false">
      <img :alt="item.title" :src="item.url" v-if="(item instanceof Object)">
      <img :src="item" v-else>
    </div>
  </div>
</template>
<script lang="ts">
import Viewer from 'viewerjs';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// 引入ViewJS样式
import 'viewerjs/dist/viewer.css';

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
  private get list() {
    return this.$store.state.image.list;
  }

  // 图片索引值
  private get index() {
    return this.$store.state.image.index;
  }

  // 展示状态
  private get display() {
    return this.$store.state.image.display;
  }

  private viewerInit() {
    Viewer.setDefaults({
      initialViewIndex: 0,
      navbar: 1,
      title: 1,
      toolbar: {
        zoomIn: 1,
        zoomOut: 1,
        oneToOne: 1,
        prev: 1,
        play: 1,
        next: 1,
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
        this.$store.commit('displayImage', true);
        this.$emit('shown', event);
        this.$emit('update:visible', true);
      },
      hide: event => {
        // 隐藏事件-开始
        this.$emit('hide', event);
      },
      hidden: event => {
        // 隐藏事件-结束
        this.$store.commit('displayImage', false);
        this.$emit('hidden', event);
        this.$emit('update:visible', false);
      },
      view: event => {
        // 切换事件-开始
        this.$emit('view', event);
      },
      viewed: event => {
        // 切换事件-结束
        this.$store.commit('imageIndex', event.detail.index);
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
    if (this.display) this.show();
  }

  private created() {
    this.$nextTick(() => {
      this.viewerInit();
    });
  }

  @Watch('list')
  private onListChange() {
    this.$nextTick(() => {
      this.update();
      console.log('update');
    });
  }

  @Watch('display')
  private onDisplayChange(newVal: boolean) {
    if (newVal) this.view(this.index);
    // if (newVal) this.show();
    else this.hide();
  }

  @Watch('index')
  private onIndexChange() {
    if (this.display) this.view(this.index);
  }

  // 销毁Viewerjs 实例
  private beforeDestroy() {
    viewer.destroy();
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
    // viewer.prev(loop);
    this.$store.commit('imageIndex', this.index ? this.index - 1 : this.list.length - 1);

    return this;
  }
  // 下一张，如果未显示灯箱，将首先显示灯箱。 loop = 是否循环
  private next(loop = false) {
    // viewer.next(loop);
    this.$store.commit('imageIndex', this.index === this.list.length - 1 ? 0 : this.index + 1);

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
