<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 基础主标题
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-05-03 19:43:54
-->
<template>
  <div>
    <!-- 设置网页title -->
    <div :id="myId" class="title" v-text="title" v-wechat-title="title"/>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseHead extends Vue {
  // Component ID
  @Prop(Number) private myId!: number;

  // Title of displayed page
  @Prop({ type: String, required: true }) private title!: string;
}
</script>
<style scoped>
.title {
  color: #333;
  font-size: 30px;
  line-height: 35px;
  font-weight: bold;
  overflow: hidden;
  padding: 10px 0;
  max-width: 600px;
  margin: 0 auto 16px auto;
  border-bottom: 1px solid #000;
}
</style>
