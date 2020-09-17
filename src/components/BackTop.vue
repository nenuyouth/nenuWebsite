<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: BackTop Button
 * @Date: 2019-03-22 19:30:08
 * @LastEditTime: 2019-11-07 16:41:19
-->
<template>
  <transition name="myfade">
    <div v-if="display" class="scrollTop" @click="scrollTop">
      <a-icon :component="BackTopSvg" style="font-size: 38px; margin: -1px" />
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import $ from "jquery";
import BackTopSvg from "|/icon/backTop.svg";

@Component
export default class BackTop extends Vue {
  private display = false;

  private BackTopSvg = BackTopSvg;

  // Make the website scroll to the top
  private scrollTop() {
    $("body,html").animate({ scrollTop: 0 }, 800);
  }

  // Register event for the "backtop" button
  private mounted() {
    window.addEventListener("scroll", () => {
      this.display = ($(window).scrollTop() || window.pageYOffset) > 300;
    });
  }
}
</script>
<style lang="stylus" scoped>
.scrollTop
  position fixed
  right 20px
  bottom 80px
  z-index 3
  width 36px
  height 36px
  background-color #fff
  border-radius 50%
</style>
