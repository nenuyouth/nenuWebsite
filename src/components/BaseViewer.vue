<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-16 15:35:49
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-19 17:12:50
 * @Description: Image Viewer
-->
<template>
  <div ref="viewer">
    <template v-for="(item, index) in list">
      <img
        :alt="item.title"
        :key="index"
        :src="item.url"
        v-if="(item instanceof Object)"
        v-show="false"
      >
      <img :key="index" :src="item" v-else v-show="false">
    </template>
  </div>
</template>
<script lang="ts">
import Viewer from 'viewerjs';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// 引入ViewJS样式
import 'viewerjs/dist/viewer.css';

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
      navbar: 1,
      toolbar: {
        prev: 1,
        play: 1,
        next: 1,
        reset: 1
      },
      interval: 3000,
      zIndex: 200,
      shown: event => {
        // 显示事件-结束
        this.$store.commit('displayImage', true);
        this.$emit('shown', event);
        this.$emit('update:visible', true);
      },
      hidden: event => {
        // 隐藏事件-结束
        this.$store.commit('displayImage', false);
        this.$emit('hidden', event);
        this.$emit('update:visible', false);
      },
      viewed: event => {
        // 切换事件-结束
        this.$store.commit('imageIndex', event.detail.index);
        this.$emit('viewed', event);
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
      viewer.update();
    });
  }

  @Watch('display')
  private onDisplayChange(newVal: boolean) {
    if (newVal) this.view(this.index);
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
    viewer.prev(loop);
    // this.$store.commit('imageIndex', this.index ? this.index - 1 : this.list.length - 1);

    return this;
  }
  // 下一张，如果未显示灯箱，将首先显示灯箱。 loop = 是否循环
  private next(loop = false) {
    viewer.next(loop);
    // this.$store.commit('imageIndex', this.index === this.list.length - 1 ? 0 : this.index + 1);

    return this;
  }
}
</script>
