<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Base Paragraph
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-11-07 16:21:38
-->
<template>
  <div :id="myId" class="Ctn">
    <div v-if="head" :style="headStyle" class="iOShead" v-text="head" />
    <div :style="{ textAlign: align }" class="iOSP">
      <p :style="myStyle" v-html="pText" />
      <div v-if="src" class="ImgCtn">
        <div v-if="!loaded" class="imgCtn">
          <Error v-if="error" class="imgIcon" />
          <Loading v-else class="imgIcon" />
          <span v-text="error ? '图片加载失败' : '加载中...'" />
        </div>
        <img v-else :src="src" class="img" @click="imgDisplay" />
        <div v-if="desc" class="imgDesc" v-text="`▲${desc}`" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Error from "|/icon/error.svg";
import Loading from "|/icon/loading.svg";

interface Style {
  [propName: string]: string;
}

enum Align {
  "left",
  "right",
  "center",
  "justify",
}

@Component({ components: { Loading, Error } })
export default class BaseP extends Vue {
  // Component ID
  @Prop(Number) private readonly myId!: number;

  // Paragragh Text
  @Prop({ type: String, required: true }) private readonly text!: string;

  // Paragragh Heading
  @Prop([String, Boolean]) private readonly head!: string | boolean;

  // Paragragh Image Link
  @Prop(String) private readonly src!: string;

  // Paragragh Image Description
  @Prop(String) private readonly desc!: string;

  // Paragragh Text style
  @Prop([String, Object]) private readonly myStyle!: string | Style;

  // Paragragh Heading Style
  @Prop([String, Object]) private readonly headStyle!: string | Style;

  // Text Align
  @Prop({ default: "left" }) private readonly align!: Align;

  // Image load status
  private loaded = false;

  private error = false;

  // Handle text data in order to display correctly with spaces and line breaks on website
  private get pText() {
    return this.text.replace(/\n/gu, "<br/>").replace(/\s/gu, "&ensp;");
  }

  private mounted() {
    const img = new Image(); // Create new Image instance

    img.src = this.src;

    // Image has been cached
    if (img.complete) {
      this.loaded = true;

      return;
    }

    // Error when loading Image, show error message
    img.onerror = () => {
      this.error = true;
    };

    // Sucess loading Image, display this Image now
    img.onload = () => {
      this.loaded = true;

      // eslint-disable-next-line no-empty-function
      img.onload = () => {};
    };
  }

  private imgDisplay() {
    this.$store.commit("imageUrl", this.src);
  }
}
</script>
<style lang="scss" scoped>
@import "~%/Weui/scss/border";

.iOShead {
  text-align: left;
  font-weight: 500;
  padding: 12px 5% 4px 5%;
  min-height: 20px;
  font-size: 19px;
  max-width: 600px;
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

.grey .iOSP {
  font-size: 17px;
  padding: 10px 15px;
  line-height: 1.6;
  text-align: left;
  background-color: #fefefe;
  max-width: 487px;
  margin: 0 auto;
  position: relative;
  &:before {
    @include topBorder(#cac9ce);
  }
  &:after {
    @include bottomBorder(#cac9ce);
  }
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
  @media (min-width: 768px) {
    margin-top: 12px;
    margin-bottom: 12px;
  }
}

.P .img {
  width: 100%;
  margin: 4px 0;
}

.imgDesc {
  margin-top: -2px;
  margin-bottom: 4px;
  font: {
    size: 12px;
    weight: 300;
  }
  text-align: center;
  color: #222;
  letter-spacing: 1px;
  @media (min-width: 768px) {
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
