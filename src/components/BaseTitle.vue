<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 基础标题
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-05-05 15:08:45
-->
<template>
  <div :id="myId" :style="myStyle" class="myH3" v-text="text"/>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface Style {
  [propName: string]: string;
}

@Component
export default class BaseTitle extends Vue {
  // Component id
  @Prop(Number) private readonly myId!: number;

  // Heading text
  @Prop({ type: String, required: true }) private readonly text!: string;

  // Heading Style
  @Prop([String, Object]) private readonly myStyle!: string | Style;
}
</script>
<style scoped>
.myH3 {
  width: 100%;
  max-width: 600px;
  text-align: left;
  font-weight: 500;
  padding: 12px 15px 4px 15px;
  min-height: 24px;
  font-size: 22px;
  max-width: 600px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .myH3 {
    min-height: 26px;
    font-size: 24px;
  }
}

.myH3 + .myH3 {
  padding-top: 2px;
}
</style>
