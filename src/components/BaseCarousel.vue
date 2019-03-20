<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 卡片组件
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-03-20 00:32:06
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
    <div class="arrow" slot="prevArrow" style="left:10px;z-index:1;" v-if="!single&&arrowDisplay">
      <a-icon type="vertical-right"/>
    </div>
    <div class="arrow" slot="nextArrow" style="right:10px;" v-if="!single&&arrowDisplay">
      <a-icon type="vertical-left"/>
    </div>
    <div :key="item.caption" @click="navigate(item.url)" class="carouselItem" v-for="item in list">
      <img :alt="item.alt" :src="item.src" class="img">
      <div :class="item.color" class="caption">
        <h1 class="display-4 d-none d-sm-block">{{ item.caption }}</h1>
        <h1 class="font-weight-light d-block d-sm-none">{{ item.caption }}</h1>
        <h1 class="lead">{{ item.subCaption }}</h1>
        <p class="lead d-none d-sm-block" v-if="item.enSubhead">{{ item.enSubhead }}</p>
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
import { Component, Prop, Vue } from 'vue-property-decorator';

interface Carousel {
  // 必填项
  caption: string; // 主标题
  subCaption: string; // 副标题
  src: string; // 图片地址

  // 选填项
  enSubhead?: string; // 英文小标题
  desc?: string; // 轮播图说明
  alt?: string; // 轮播图片替代文字
  url?: string; // 轮播图跳转地址
  black?: boolean; // 轮播图文字是否为黑色（默认为白色）

  // 内部属性
  activeStatus?: string;
  color?: string;
}

@Component
export default class BaseCarousel extends Vue {
  // 组件id
  @Prop([Number, String]) private myId!: number | string;

  // 组件内容
  @Prop({ type: Array, required: true }) private content!: Carousel[];

  // 是否竖直显示
  @Prop({ type: Boolean, default: false }) private vertical!: boolean;

  // 是否支持自动播放
  @Prop({ type: Boolean, default: true }) private autoplay!: boolean;

  // 自动播放时间间隔
  @Prop({ type: Number, default: 3000 }) private autoplaySpeed!: boolean;

  // 切换速度
  @Prop({ type: Number, default: 500 }) private speed!: number;

  // 是否显示指示点
  @Prop({ type: Boolean, default: true }) private dotDisplay!: boolean;

  // 是否显示切换箭头
  @Prop({ type: Boolean, default: true }) private arrowDisplay!: boolean;

  // 切换动画
  @Prop({ type: String, default: 'easeInOutQuart' }) private easing!: string;

  // 是否显示指示点判断
  private get dots() {
    return this.single ? false : this.dotDisplay;
  }

  // 是否是单个轮播图
  private single = false;

  // 轮播图列表
  private list: Carousel[] = [];

  // 点击跳转
  private navigate(url: string | undefined) {
    const router = this.$router;
    const route = this.$route;

    if (url)
      if (url && url[0] === '/')
        // 内部绝对路径
        router.push(url);
      else if (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1)
        // 外部链接
        window.open(url);
      else {
        // 内部相对路径
        const base = route.path.slice(0, route.path.lastIndexOf('/'));

        router.push(`${base}/${url}`);
      }
  }

  private mounted() {
    // 复制content内容到data中
    this.list = JSON.parse(JSON.stringify(this.content));

    // 对list进行处理
    this.list.forEach((element: Carousel, index: number) => {
      // 初始化第一张轮播图激活信息
      if (index === 0) element.activeStatus = 'active';

      // 使黑文字配置生效
      if (element.black === true) {
        element.color = 'textBlack';
        delete element.black;
      }

      // 确保轮播图有替代文字
      if (!element.alt) element.alt = '轮播图背景';
    });

    // 只有一张轮播图时设置为single
    if (this.list.length === 1) this.single = true;
  }
}
</script>
<style scoped>
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
}
.caption h1 {
  color: #fff;
}
.caption h2 {
  color: #fff;
}
.textBlack h1 {
  color: #000;
}
.textBlack h2 {
  color: #000;
}
.img {
  display: block;
  width: 100%;
}
</style>
