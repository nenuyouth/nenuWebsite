<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 返回顶部按钮
 * @Date: 2019-03-22 19:30:08
 * @LastEditTime: 2019-03-23 11:46:28
 -->
<template>
  <div @click="scrollTop" class="scrollTop" style="display:none">
    <div class="backTop">
      <icon-font style="font-size:36px;" type="icon-backTop"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class BackTop extends Vue {
  // 返回顶部函数
  private scrollTop() {
    $('body,html').animate({ scrollTop: 0 }, 800);
  }

  private mounted() {
    // 注册“返回顶部”按钮动作
    window.addEventListener('scroll', () => {
      if (($(window).scrollTop() || window.pageYOffset) > 300) $('.scrollTop').fadeIn(500);
      else $('.scrollTop').fadeOut(500);
    });
  }
}
</script>
<style scoped>
.backTop {
  background-color: #fff;
  border-radius: 50%;
}

.scrollTop {
  position: fixed;
  right: 20px;
  bottom: 60px;
  z-index: 3;
  width: 36px;
  height: 36px;
}
</style>
