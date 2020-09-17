<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 基础主标题
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-11-07 16:42:39
-->
<template>
  <!-- 设置网页title -->
  <div :id="myId" v-wechat-title="title" class="title" v-text="title" />
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BaseHead extends Vue {
  // Component ID
  @Prop(Number) private readonly myId!: number;

  // Title of displayed page
  @Prop({ type: String, required: true }) private readonly title!: string;
}
</script>
<style lang="stylus" scoped>
.title
  color #333
  font-size 24px
  line-height 30px
  font-weight bold
  overflow hidden
  padding 10px 0
  max-width 600px
  margin 0 auto 16px auto
  border-bottom 1px solid #000
</style>
