<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-16 15:35:49
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-25 21:19:17
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
      />
      <img :key="index" :src="item" v-else v-show="false" />
    </template>
  </div>
</template>
<script lang="ts">
import Viewer from 'viewerjs';
import { computed, createComponent, onUnmounted, watch } from '@vue/composition-api';

// 引入ViewJS样式
import 'viewerjs/dist/viewer.css';

let viewer: Viewer;

export default createComponent({
  name: 'ImageViewer',
  setup(props, context) {
    // 图片列表
    const list = computed(() => context.root.$store.state.image.list);

    // 图片索引值
    const index = computed(() => context.root.$store.state.image.index);

    // 展示状态
    const display = computed(() => context.root.$store.state.image.display);

    // 显示 immediate = 是否立即显示
    const show = (immediate?: boolean) => {
      viewer.show(immediate);
    };

    // 隐藏 immediate = 是否立即隐藏
    const hide = (immediate?: boolean) => {
      viewer.hide(immediate);
    };

    // 切换到图像到索引的图像位置，如果未显示灯箱，将首先显示灯箱。index = 索引
    const view = (imageIndex: number) => {
      viewer.view(imageIndex);
    };

    // 上一张，如果未显示灯箱，将首先显示灯箱。 loop = 是否循环
    const prev = (loop = false) => {
      viewer.prev(loop);
      // this.$store.commit('imageIndex', this.index ? this.index - 1 : this.list.length - 1);
    };

    // 下一张，如果未显示灯箱，将首先显示灯箱。 loop = 是否循环
    const next = (loop = false) => {
      viewer.next(loop);
      // this.$store.commit('imageIndex', this.index === this.list.length - 1 ? 0 : this.index + 1);
    };

    // 初始化Viewer
    const viewerInit = () => {
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
          console.log('show');
          // 显示事件-结束
          context.root.$store.commit('displayImage', true);
          context.emit('shown', event);
          context.emit('update:visible', true);
        },
        hidden: event => {
          console.log('hide');
          // 隐藏事件-结束
          context.root.$store.commit('displayImage', false);
          context.emit('hidden', event);
          context.emit('update:visible', false);
        },
        viewed: event => {
          // 切换事件-结束
          context.root.$store.commit('imageIndex', event.detail.index);
          context.emit('viewed', event);
        }
      });

      viewer = new Viewer(context.refs.viewer as Element);
      if (display) show();
    };

    context.root.$nextTick(() => {
      viewerInit();
    });

    watch(list, () => {
      context.root.$nextTick(() => {
        viewer.update();
      });
    });

    watch(display, newVal => {
      if (newVal) view(index.value);
      else hide();
    });

    watch(index, () => {
      if (display) view(index.value);
    });

    // 销毁Viewerjs 实例
    onUnmounted(() => {
      viewer.destroy();
    });

    return { list, index, show, hide, view };
  }
});
</script>
