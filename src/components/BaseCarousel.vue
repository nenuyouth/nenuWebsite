<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Base Carousel
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-08-25 19:02:48
-->
<template>
  <a-carousel
    :arrows="true"
    :autoplay="autoplay"
    :autoplay-speed="autoplaySpeed"
    :dots="dots"
    :speed="speed"
    :vertical="vertical"
  >
    <!-- prevArrow -->
    <template #prevArrow>
      <div v-if="!single&&arrowDisplay" class="arrow" style="left:10px;z-index:1;">
        <a-icon type="vertical-right" />
      </div>
    </template>

    <!-- nextArrow -->
    <template #nextArrow>
      <div v-if="!single&&arrowDisplay" class="arrow" style="right:10px;">
        <a-icon type="vertical-left" />
      </div>
    </template>

    <!-- carousel item -->
    <div
      v-for="item in list"
      :key="item.caption"
      class="carouselItem"
      @click="$navigate(item.url,$router,$route)"
    >
      <img :alt="item.alt" :src="item.src" class="img" />
      <div :class="item.color" class="caption">
        <h1 class="display-4 d-none d-sm-block" v-text="item.caption" />
        <h1 class="font-weight-light d-block d-sm-none" v-text="item.caption" />
        <h1 class="lead" v-text="item.subCaption" />
        <p v-if="item.enSubCaption" class="lead d-none d-sm-block">{{ item.enSubCaption }}</p>
        <p
          v-if="item.desc"
          class="d-none d-lg-block text-right font-weight-light"
          style="line-height: 1;"
        >{{ item.desc }}</p>
      </div>
    </div>
  </a-carousel>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import navigate from '%/navigate';

interface Carousel {
  caption: string; // 主标题
  subCaption: string; // 副标题
  src: string; // 图片地址

  enSubCaption?: string; // 英文小标题
  desc?: string; // 轮播图说明
  alt?: string; // 轮播图片替代文字
  url?: string; // 轮播图跳转地址
  black?: boolean; // 轮播图文字是否为黑色（默认为白色）

  // Private property
  activeStatus?: string;
  color?: string;
}

@Component
export default class BaseCarousel extends Vue {
  // Component id
  @Prop([Number, String]) private readonly myId!: number | string;

  // CarouselItems config
  @Prop({ type: Array, required: true }) private readonly content!: Carousel[];

  // Whether to display vertically
  @Prop({ type: Boolean, default: false }) private readonly vertical!: boolean;

  // Whether to start autoplay
  @Prop({ type: Boolean, default: true }) private readonly autoplay!: boolean;

  // Autoplay time
  @Prop({ type: Number, default: 3000 }) private readonly autoplaySpeed!: boolean;

  // Slide's switching time
  @Prop({ type: Number, default: 500 }) private readonly speed!: number;

  // whether to display indicators
  @Prop({ type: Boolean, default: true }) private readonly dotDisplay!: boolean;

  // Whether to display swtich arrows
  @Prop({ type: Boolean, default: true }) private readonly arrowDisplay!: boolean;

  // Switching animation
  @Prop({ type: String, default: 'easeInOutQuart' }) private readonly easing!: string;

  // Display indicators or not
  private get dots() {
    return this.single ? false : this.dotDisplay;
  }

  // Whether it has only one children
  private single = false;

  // Carousel item list
  private list: Carousel[] = [];

  private mounted() {
    // Make a copy of carouselItems config
    this.list = JSON.parse(JSON.stringify(this.content));

    this.list.forEach((element: Carousel, index: number) => {
      // init active status for the first carousel item
      if (index === 0) element.activeStatus = 'active';

      // mark 'black' config works
      if (element.black === true) {
        element.color = 'textBlack';
        delete element.black;
      }

      // make sure carouselItem has an 'alt' option
      if (!element.alt) element.alt = '轮播图背景';
    });

    // set single when containing only one item
    if (this.list.length === 1) this.single = true;
  }
}
</script>
<style lang='scss' scoped>
.ant-carousel {
  max-width: 100%;
}
.ant-carousel >>> .slick-slide {
  text-align: center;
  overflow: hidden;
}

.ant-carousel >>> .arrow {
  width: 20px;
  height: 20px;
  font-size: 20px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .arrow:before {
  display: none;
}
.ant-carousel >>> .arrow:hover {
  opacity: 0.5;
}

.slick-track {
  width: 100%;
}

.carouselItem {
  position: relative;
}

.caption {
  position: absolute;
  padding-top: 20px;
  left: 5%;
  right: 5%;
  bottom: 20px;
  color: rgba(255, 255, 255, 1) !important;
  text-align: center;
  vertical-align: center;
  h1 {
    color: #fff;
  }
  h2 {
    color: #fff;
  }
}

.textBlack {
  h1 {
    color: #000;
  }
  h2 {
    color: #000;
  }
}

.img {
  display: block;
  width: 100%;
}
</style>
