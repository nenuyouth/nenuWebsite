<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: BackTop Button
 * @Date: 2019-03-22 19:30:08
 * @LastEditTime: 2019-08-25 20:02:02
-->
<template>
  <transition name="myfade">
    <div @click="scrollTop" class="scrollTop" v-if="display">
      <a-icon :component="backTopSvg" style="font-size:38px;margin:-1px;" />
    </div>
  </transition>
</template>
<script lang="ts">
import { createComponent, onMounted, ref } from '@vue/composition-api';
import $ from 'jquery';
import BackTopSvg from '|/icon/backTop.svg';

const BackTop = createComponent({
  setup() {
    const display = ref(false);
    const backTopSvg = ref(BackTopSvg);

    // Make the website scroll to the top
    const scrollTop = () => {
      $('body,html').animate({ scrollTop: 0 }, 800);
    };

    // Register event for the "backtop" button
    onMounted(() => {
      window.addEventListener('scroll', () => {
        display.value = ($(window).scrollTop() || window.pageYOffset) > 300;
      });
    });

    return {
      display,
      backTopSvg,
      scrollTop
    };
  }
});

export default BackTop;
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
