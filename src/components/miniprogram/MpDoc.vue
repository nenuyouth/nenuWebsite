<template>
  <div class="doc-wrapper">
    <!-- 文档图标 -->
    <image class="doc-icon" src="./icon/{{icon}}.svg" />
    <!-- 文档名称 -->
    <div class="name">{{name}}</div>
    <!-- 下载按钮 -->
    <div wx:if="{{downloadable !== false}}" class="download" @click="download">
      <img class="icon" src="./icon/download.svg" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseDoc extends Vue {
  @Prop({ type: String, required: true })
  private readonly name!: string;

  @Prop({ type: String, required: true })
  private readonly icon!: string;

  @Prop({ type: String, required: true })
  private readonly url!: string;

  @Prop({ type: Boolean, default: true })
  private readonly downloadable!: boolean;

  // Download Doc
  private download() {
    window.open(this.url);
  }
}
</script>
<style scoped>
</style>
