<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 基础主标题
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-08-10 11:34:23
-->
<template>
  <div>
    <!-- 设置网页title -->
    <div :id="myId" class="title" v-text="title" v-wechat-title="title" />
  </div>
</template>
<script lang="ts">
import { createComponent } from 'vue-function-api';

const BaseHead = createComponent({
  props: {
    // Component ID
    myId: Number,

    // Title of displayed page
    title: { type: String, required: true }
  }
});

export default BaseHead;
</script>
<style scoped>
.title {
  color: #333;
  font-size: 24px;
  line-height: 30px;
  font-weight: bold;
  overflow: hidden;
  padding: 10px 0;
  max-width: 600px;
  margin: 0 auto 16px auto;
  border-bottom: 1px solid #000;
}
</style>
