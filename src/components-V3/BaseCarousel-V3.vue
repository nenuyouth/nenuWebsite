<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Base Carousel
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-08-25 21:07:48
-->
<template>
  <a-carousel
    :arrows="true"
    :autoplay="autoplay"
    :autoplaySpeed="autoplaySpeed"
    :dots="dots"
    :speed="speed"
    :vertical="vertical"
  >
    <!-- prevArrow -->
    <template #prevArrow>
      <div class="arrow" style="left:10px;z-index:1;" v-if="!single&&arrowDisplay">
        <a-icon type="vertical-right" />
      </div>
    </template>

    <!-- nextArrow -->
    <template #nextArrow>
      <div class="arrow" style="right:10px;" v-if="!single&&arrowDisplay">
        <a-icon type="vertical-left" />
      </div>
    </template>

    <!-- carousel item -->
    <div
      :key="item.caption"
      @click="$navigate(item.url,$router,$route)"
      class="carouselItem"
      v-for="item in list"
    >
      <img :alt="item.alt" :src="item.src" class="img" />
      <div :class="item.color" class="caption">
        <h1 class="display-4 d-none d-sm-block" v-text="item.caption" />
        <h1 class="font-weight-light d-block d-sm-none" v-text="item.caption" />
        <h1 class="lead" v-text="item.subCaption" />
        <p class="lead d-none d-sm-block" v-if="item.enSubCaption">{{ item.enSubCaption }}</p>
        <p
          class="d-none d-lg-block text-right font-weight-light"
          style="line-height: 1;"
          v-if="item.desc"
        >{{ item.desc }}</p>
      </div>
    </div>
  </a-carousel>
</template>
<script lang="ts">
import { computed, createComponent, onMounted, ref } from '@vue/composition-api';


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

interface Props {
  /** Component ID */
  myId?: number | string;
  /** CarouselItems config */
  content: Carousel[];
  /** Whether to display vertically */
  vertical: boolean;
  /** Whether to start autoplay */
  autoplay: boolean;
  /** Autoplay time */
  autoplaySpeed: number;
  /** Slide's switching time */
  speed: number;
  /** Whether to display indicators */
  dotDisplay: boolean;
  /** Whether to display swtich arrows */
  arrowDisplay: boolean;
  /** Switching animation */
  easing: string;
}

export default createComponent<Props, {}>({
  name: 'BaseCarousel',
  props: {
    myId: [Number, String],
    content: { type: Array, required: true },
    vertical: { type: Boolean, default: false },
    autoplay: { type: Boolean, default: true },
    autoplaySpeed: { type: Number, default: 3000 },
    speed: { type: Number, default: 500 },
    dotDisplay: { type: Boolean, default: true },
    arrowDisplay: { type: Boolean, default: true },
    easing: { type: String, default: 'easeInOutQuart' }
  },
  setup(props) {
    // Whether it has only one children
    const single = ref(false);

    // Carousel item list
    const list = ref([] as Carousel[]);

    // Display indicators or not
    const dots = computed(() => single.value ? false : props.dotDisplay);

    onMounted(() => {
      // Make a copy of carouselItems config
      list.value = JSON.parse(JSON.stringify(props.content));

      list.value.forEach((element, index) => {
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
      if (list.value.length === 1) single.value = true;
    });

    return {
      single,
      list,
      dots
    };
  }
});
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
