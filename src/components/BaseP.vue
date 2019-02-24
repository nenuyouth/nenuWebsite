<template>
  <div :id="myId" class="Ctn">
    <div :style="headStyle" class="iOShead" v-if="head">{{ head }}</div>
    <div :style="{ textAlign: align }" class="iOSP">
      <p :style="myStyle" v-html="pText"></p>
      <div class="Ctn" v-if="src">
        <div class="iOSImgCtn" v-if="!loaded">
          <img :src="require(`@/icon/${error ? 'error' : 'loading'}.svg`)" class="imgIcon">
          <span>{{ error ? "图片加载失败" : "加载中..." }}</span>
        </div>
        <img :src="src" class="iOS-img" v-else>
        <div class="iOSN" v-text="desc ? '▲' + desc : ''"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';

interface Style {
  [propName: string]: string;
}

enum Align {
  'left',
  'right',
  'center',
  'justify'
}

export default class BaseP extends Vue {
  // 对text进行处理以在网页上正常显示空格与换行
  protected get pText() {
    return this.text.replace(/\n/gu, '<br/>').replace(/\s/gu, '&ensp;');
  }

  // 图片加载状态
  private loaded = false;

  private error = false;

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
      const img = new Image();

      img.src = this.src;
      if (img.complete) {
        this.loaded = true;

        return;
      }
      img.onerror = () => {
        this.error = true;
      };
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
</style>
