<!--
 * @Author: Mr.Hope
 * @Date: 2019-07-02 12:21:47
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-25 19:36:41
 * @Description: 基础步骤条
-->
<template>
  <a-steps :current="current" :size="smallSize? 'small' :'default'" class="steps">
    <a-step v-for="item in config" :key="item.title">
      <template #title>{{item.title}}</template>
      <template v-if="item.desc" #description>{{item.desc}}</template>
      <a-icon v-if="item.icon" slot="icon" :type="item.icon" />
    </a-step>
  </a-steps>
</template>
<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator';

interface StepsConfig {
  title: string;
  desc?: string;
  icon?: string;
}

@Component
export default class BaseSteps extends Vue {
  @Prop({ type: Boolean, default: false }) private readonly smallSize!: boolean;

  @Prop(Array) private readonly config!: any[];

  // Step progress index
  @Model('change', { type: Number }) private current!: number;
}
</script>
<style scoped>
.steps {
  margin: 16px 5%;
  width: 90%;
}
</style>
