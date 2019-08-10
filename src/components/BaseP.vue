<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Base Paragraph
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-08-10 14:12:46
-->
<template>
  <div :id="myId" class="Ctn">
    <div :style="headStyle" class="iOShead" v-if="head" v-text="head" />
    <div :style="{ textAlign: align }" class="iOSP">
      <p :style="myStyle" v-html="pText" />
      <div class="ImgCtn" v-if="src">
        <div class="imgCtn" v-if="!loaded">
          <Error class="imgIcon" v-if="error" />
          <Loading class="imgIcon" v-else />
          <span v-text="error ? '图片加载失败' : '加载中...'" />
        </div>
        <img :src="src" @click="imgDisplay" class="img" v-else />
        <div class="imgDesc" v-if="desc" v-text="`▲${desc}`" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, createComponent, onMounted, value } from 'vue-function-api';
import Loading from '|/icon/loading.svg';
import Error from '|/icon/error.svg';

interface Style {
  [propName: string]: string;
}

enum Align {
  'left',
  'right',
  'center',
  'justify'
}

const BaseP = createComponent({
  props: {
    // Component ID
    myId: Number,
    // Paragragh Text
    text: { type: String, required: true },
    // Paragragh Heading
    head: [String, Boolean],
    // Paragragh Image Link
    src: String,
    // Paragragh Image Description
    desc: String,
    // Paragragh Text style
    myStyle: [String, Object], // string | Style

    // Paragragh Heading Style
    headStyle: [String, Object], // string | Style

    // Text Align
    align: { type: String, default: 'left' }
  },
  setup(props, context) {
    // Image load status
    const loaded = value(false);
    const error = value(false);

    // Handle text data in order to display correctly with spaces and line breaks on website
    const pText = computed(() =>
      (props.text as unknown as string)
        .replace(/\n/gu, '<br/>')
        .replace(/\s/gu, '&ensp;'));


    onMounted(() => {
      const img = new Image(); // Create new Image instance

      img.src = props.src as unknown as string;

      // Image has been cached
      if (img.complete) {
        loaded.value = true;

        return;
      }

      // Error when loading Image, show error message
      img.onerror = () => {
        error.value = true;
      };

      // Sucess loading Image, display this Image now
      img.onload = () => {
        loaded.value = true;

        delete img.onload;
      };
    });

    const imgDisplay = () => {
      context.root.$store.commit('imageUrl', props.src);
    };

    return {
      loaded,
      error,
      pText,
      imgDisplay
    };
  }
});

export default BaseP;
</script>
<style lang='scss' scoped>
@import '~%/Weui/scss/border';

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
