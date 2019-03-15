<template>
  <div class="alertMask">
    <div class="alertBox">
      <div class="header">
        <span class="title">{{title}}</span>
        <img alt="关闭" class="closeBtn" src="/img/icon/close.svg" v-if="close">
      </div>
      <div class="content">{{text}}</div>
      <div class="foot">
        <button :key="button.text" @click="button.Func" v-for="button in buttonList">{{text}}</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface ButtonList {
  text: string;
  Func?: object;
}
/**
 * @description: alert弹窗
 * @param title 标题
 * @param text 内容文字
 * @param buttonList 按钮列表
 */
@Component
export default class BaseAlert extends Vue {
  @Prop({ default: '', type: String }) private title!: string;

  @Prop(String) private text!: string;

  @Prop(Array) buttonList!: ButtonList[];

  private close = true;

  private closeAlert() {
    // TODO:
  }
}
</script>
<style scoped>
.alertMask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  z-index: 1000;
}
.alertBox {
  position: fixed;
  width: 80%;
  top: 30%;
  left: 10%;
  z-index: 1100;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 8px 10% 4px 10%;
  border-bottom: 1px solid #000;
}
.title {
  font-size: 15px;
}
.closeBtn {
  width: 15px;
  height: 15px;
}
</style>
