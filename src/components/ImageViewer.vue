<template>
  <div id="imageViewer">
    <img :src="$store.state.images">
  </div>
</template>
<script lang="ts">
import Viewer from 'viewerjs';
import { Component, Vue, Watch } from 'vue-property-decorator';

// 引入ViewJS样式
import 'viewerjs/dist/viewer.css';

Viewer.setDefaults({
  inline: false,
  button: true,
  navbar: true,
  title: true,
  toolbar: 2,
  tooltip: true,
  movable: true,
  zoomable: true,
  rotatable: true,
  scalable: true,
  transition: true,
  fullscreen: true,
  keyboard: true,
  url: 'src'
});

@Component
export default class ImageViewer extends Vue {
  private viewer = {};

  private mounted() {
    const ViewerDom = document.getElementById('imageViewer');
    if (ViewerDom) {
      this.viewer = new Viewer(ViewerDom, {
        // 配置
      });
    }
  }

  private src = '/img/icon/logo.png';
}
</script>
