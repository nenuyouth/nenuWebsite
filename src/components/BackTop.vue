<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: BackTop Button
 * @Date: 2019-03-22 19:30:08
 * @LastEditTime: 2019-04-02 14:08:34
-->
<template>
  <div @click="scrollTop" class="scrollTop" style="display:none">
    <icon-font style="font-size:36px;" type="icon-backTop"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BackTop extends Vue {
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
