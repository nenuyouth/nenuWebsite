<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: BackTop Button
 * @Date: 2019-03-22 19:30:08
 * @LastEditTime: 2019-05-19 10:06:42
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
