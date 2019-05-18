<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: BackTop Button
 * @Date: 2019-03-22 19:30:08
 * @LastEditTime: 2019-05-18 23:13:08
-->
<template>
  <transition name="myfade">
    <div @click="scrollTop" class="scrollTop" v-if="display">
      <a-icon :component="BackTopSvg" style="font-size:38px;margin:-1px;"/>
    </div>
  </transition>
</template>
<script lang="ts">
import BackTopSvg from '|/icon/backTop.svg';
import { Component, Vue } from 'vue-property-decorator';
import $ from 'jquery';

@Component
export default class BackTop extends Vue {
  private display = false;
  private BackTopSvg = BackTopSvg;

  // Make the website scroll to the top
  private scrollTop() {

    // const ScrollTop = (px = 0, time?: number) => {
    //   if (!time) {
    //     document.body.scrollTop = document.documentElement.scrollTop = px;

    //     return px;
    //   }
    //   const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
    //   let spacingInex = time / spacingTime; // 计算循环的次数
    //   let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
    //   const everTop = (px - nowTop) / spacingInex; // 计算每次滑动的距离
    //   const scrollTimer = setInterval(() => {
    //     if (spacingInex > 0) {
    //       spacingInex -= 1;
    //       ScrollTop(nowTop += everTop);
    //     } else clearInterval(scrollTimer); // 清除计时器
    //   }, spacingTime);
    // };

    // ScrollTop(0, 800);
    $('body,html').animate({ scrollTop: 0 }, 800);
  }

  // Register event for the "backtop" button
  private mounted() {
    window.addEventListener('scroll', () => {
      this.display = ($(window).scrollTop() || window.pageYOffset) > 300;
    });
  }
}
</script>
<style scoped>
.scrollTop {
  position: fixed;
  right: 20px;
  bottom: 80px;
  z-index: 3;
  width: 36px;
  height: 36px;
  background-color: #fff;
  border-radius: 50%;
}
</style>
