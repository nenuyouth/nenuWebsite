<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 基础图片
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-03-16 19:43:16
 -->
<template>
  <div :id="myId" class="ImgCtn">
    <div class="imgCtn" v-if="!loaded">
      <img :src="require(`@/icon/${error ? 'error' : 'loading'}.svg`)" class="imgIcon">
      <span>{{ error ? "图片加载失败" : "加载中..." }}</span>
    </div>
    <img :src="src" @click="showImg = true" class="img" v-else>
    <div class="imgDesc">{{desc ? '▲' + desc : ''}}</div>
    <div @click="showImg = false" class="preview" v-if="showImg">
      <img :src="src" class="previewImg">
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseImg extends Vue {
  @Prop(Number) private myId!: number;

  @Prop({ type: String, required: true }) private src!: string;

  @Prop(String) private desc!: string;

  // 图片载入状态
  private loaded = false;
  private error = false;

  // 图片展示
  private showImg = false;

  private mounted() {
    // 加载图片
    const img = new Image(); // 创建新Image实例

    img.src = this.src;

    // 如果图片已经被缓存立即结束函数
    if (img.complete) {
      this.loaded = true;

      return;
    }

    // 图片加载出错
    img.onerror = () => {
      this.error = true;
    };

    // 图片加载成功
    img.onload = () => {
      this.loaded = true;

      delete img.onload;
    };
  }
}
</script>
<style scoped>
.ImgCtn {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.imgIcon {
  width: 30px;
  height: 30px;
  margin-right: 20px;
}

.imgCtn {
  width: 90%;
  height: 50px;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px 5%;
  border-radius: 8px;
  background-color: #efeef4;
  color: #888;
  max-width: 560px !important;
}

.img {
  width: 90% !important;
  margin: 4px 5%;
  border-radius: 8px;
  max-width: 560px !important;
}

.P .img {
  width: 100%;
  margin: 4px 0;
}

@media (min-width: 768px) {
  .img {
    margin-top: 12px;
    margin-bottom: 12px;
  }
}

.imgDesc {
  margin-top: -2px;
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  color: #222;
  letter-spacing: 1px;
}

@media (min-width: 768px) {
  .imgDesc {
    font-size: 14px;
  }
}

.nm .imgDesc {
  color: #ddd;
}

.preview {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000026;
}

.previewImg {
  max-width: 90%;
  max-height: 100%;
  border-radius: 5px;
}
</style>
