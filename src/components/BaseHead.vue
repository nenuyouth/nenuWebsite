<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 基础主标题
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-03-16 19:30:10
 -->
<template>
  <div>
    <!-- 设置网页title -->
    <div :id="myId" class="title" v-wechat-title="title">{{ title }}</div>
    <hr>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseHead extends Vue {
  @Prop(Number) private myId!: number;

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
  margin: 0 auto;
}
hr {
  max-width: 600px;
  height: 2px;
  margin: 0 auto;
}
</style>
