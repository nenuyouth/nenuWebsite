<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: BackTop Button
 * @Date: 2019-03-22 19:30:08
 * @LastEditTime: 2019-05-01 15:00:43
-->
<template>
  <div @click="scrollTop" class="scrollTop" style="display:none">
    <a-icon :component="BackTopSvg" style="font-size:36px;"/>
  </div>
</template>
<script lang="ts">
import BackTopSvg from '@/assets/icon/backTop.svg';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BackTop extends Vue {
  private BackTopSvg = BackTopSvg;

  // Make the website scroll to the top
  private scrollTop() {
    $('body,html').animate({ scrollTop: 0 }, 800);
  }

  // Register event for the "backtop" button
  private mounted() {
    $(window).on('scroll', () => {
      if (($(window).scrollTop() || window.pageYOffset) > 300) $('.scrollTop').fadeIn(500);
      else $('.scrollTop').fadeOut(500);
    });
  }
}
</script>
<style scoped>
.scrollTop {
  position: fixed;
  right: 20px;
  bottom: 60px;
  z-index: 3;
  width: 36px;
  height: 36px;
  background-color: #fff;
  border-radius: 50%;
}
</style>
