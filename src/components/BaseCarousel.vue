<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 卡片组件
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-03-16 19:33:47
 -->
<template>
  <div :id="`display${myId}`" class="carousel slide w-100" data-ride="carousel">
    <ol class="carousel-indicators" v-if="!single">
      <li
        :class="item.activeStatus"
        :data-slide-to="index"
        :data-target="`#display${myId}`"
        :key="item.heading"
        v-for="(item, index) in list"
      ></li>
    </ol>
    <div class="carousel-inner">
      <div
        :class="`carousel-item ${item.activeStatus}`"
        :key="item.heading"
        @click="navigate(item.url)"
        v-for="item in list"
      >
        <img :alt="item.alt" :src="item.src" class="d-block w-100">
        <div :class="`carousel-caption ${item.colorStatus} prominent`">
          <h1 class="display-4 d-none d-sm-block">{{ item.heading }}</h1>
          <h1 class="font-weight-light d-block d-sm-none">{{ item.heading }}</h1>
          <h1 class="lead">{{ item.subhead }}</h1>
          <p class="lead d-none d-sm-block" v-if="item.enSubhead">{{ item.enSubhead }}</p>
          <p
            class="d-none d-lg-block text-right font-weight-light"
            style="line-height: 1;"
            v-if="item.desc"
          >{{ item.desc }}</p>
        </div>
      </div>
    </div>
    <a
      :href="`#display${myId}`"
      class="carousel-control-prev"
      data-slide="prev"
      role="button"
      v-if="!single"
    >
      <span aria-hidden="true" class="carousel-control-prev-icon"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      :href="`#display${myId}`"
      class="carousel-control-next"
      data-slide="next"
      role="button"
      v-if="!single"
    >
      <span aria-hidden="true" class="carousel-control-next-icon"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface Carousel {
  // 必填项
  heading: string; // 主标题
  subhead: string; // 副标题
  src: string; // 图片地址

  // 选填项
  enSubhead?: string; // 英文小标题
  desc?: string; // 轮播图说明
  alt?: string; // 轮播图片替代文字
  url?: string; // 轮播图跳转地址
  black?: boolean; // 轮播图文字是否为黑色（默认为白色）

  // 内部属性
  activeStatus?: string;
  colorStatus?: string;
}

@Component
export default class BaseCarousel extends Vue {
  // 是否是单个轮播图
  private single = false;

  // 轮播图列表
  private list: Carousel[] = [];

  // 组件id
  @Prop([Number, String]) private myId!: number | string;

  // 组件内容
  @Prop({ type: Array, required: true }) private content!: Carousel[];

  private navigate(url: string | undefined) {
    if (url)
      if (url[0] === '/') this.$router.push(url);
      else if (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1) window.open(url);
      else {
        const base = this.$route.path.slice(0, this.$route.path.lastIndexOf('/'));

        this.$router.push(`${base}/${url}`);
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
        element.colorStatus = 'text-black';
        delete element.black;
      }

      // 确保轮播图有替代文字
      if (!element.alt) element.alt = '轮播图背景';
    });

    // 只有一张轮播图时隐藏控件
    if (this.list.length === 1) this.single = true;
  }
}
</script>
