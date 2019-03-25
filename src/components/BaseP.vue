<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Base Paragraph
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-03-25 12:05:25
 -->
<template>
  <div :id="myId" class="Ctn">
    <div :style="headStyle" class="iOShead" v-if="head">{{ head }}</div>
    <div :style="{ textAlign: align }" class="iOSP">
      <p :style="myStyle" v-html="pText"></p>
      <div class="ImgCtn" v-if="src">
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
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface Style {
  [propName: string]: string;
}

enum Align {
  'left',
  'right',
  'center',
  'justify'
}

@Component
export default class BaseP extends Vue {
  // 图片加载状态
  public loaded = false;
  public error = false;

  // 图片展示
  private showImg = false;

  @Prop(Number) private myId!: number;

  @Prop({ type: String, required: true }) private text!: string;

  @Prop([String, Boolean]) private head!: string | boolean;

  @Prop(String) private src!: string;

  @Prop(String) private desc!: string;

  @Prop([String, Object]) private myStyle!: string | Style;

  @Prop([String, Object]) private headStyle!: string | Style;

  @Prop({ default: 'left' }) private align!: Align;

  // 对text进行处理以在网页上正常显示空格与换行
  private get pText() {
    return this.text.replace(/\n/gu, '<br/>').replace(/\s/gu, '&ensp;');
  }

  private mounted() {
    // 图片处理
    if (this.src) {
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
}
</script>
<style scoped>
.iOShead {
  text-align: left;
  font-weight: 500;
  padding: 12px 5% 4px 5%;
  min-height: 20px;
  font-size: 19px;
}
.iOSP {
  font-size: 16px;
  line-height: 1.6;
  word-wrap: break-word;
  padding: 0 15px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .iOShead {
    min-height: 22px;
    font-size: 21px;
    max-width: 600px;
  }
  .iOSP {
    font-size: 18px;
  }
}

.grey .iOSP {
  font-size: 17px;
  padding: 10px 15px;
  line-height: 1.6;
  text-align: left;
  background-color: #fefefe;
  max-width: 487px;
  margin: 0 auto;
  position: relative;
}

.grey .iOSP:after,
.grey .iOSP:before {
  content: ' ';
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  color: #cac9ce;
}

.grey .iOSP:after {
  bottom: 0;
  border-bottom: 1px solid #cac9ce;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.4);
  transform: scaleY(0.4);
}

.grey .iOSP:before {
  top: 0;
  border-top: 1px solid #cac9ce;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.4);
  transform: scaleY(0.4);
}

.grey.nm .iOSP:before,
.grey.nm .iOSP:after {
  border-color: #353631;
}

.nm .iOSP {
  background-color: #000;
  color: #fff;
}

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
}
</style>
