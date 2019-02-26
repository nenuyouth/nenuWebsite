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
        <img :src="src" class="img" v-else>
        <div class="imgDesc" v-text="desc ? '▲' + desc : ''"></div>
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
  // 对text进行处理以在网页上正常显示空格与换行
  get pText() {
    return this.text.replace(/\n/gu, '<br/>').replace(/\s/gu, '&ensp;');
  }

  // 图片加载状态
  public loaded = false;

  public error = false;

  @Prop(Number) private myId!: number;

  @Prop({ type: String, required: true }) private text!: string;

  @Prop([String, Boolean]) private head!: string | boolean;

  @Prop(String) private src!: string;

  @Prop(String) private desc!: string;

  @Prop([String, Object]) private myStyle!: string | Style;

  @Prop([String, Object]) private headStyle!: string | Style;

  @Prop({ default: 'left' }) private align!: Align;

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
  border-top: 1rpx #cac9ce solid;
  border-bottom: 1rpx #cac9ce solid;
  max-width: 487px;
  margin: 0 auto;
}

.grey.nm .iOSP {
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
</style>
