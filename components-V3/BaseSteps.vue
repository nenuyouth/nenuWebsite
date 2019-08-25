<!--
 * @Author: Mr.Hope
 * @Date: 2019-07-02 12:21:47
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-25 21:15:04
 * @Description: 基础步骤条
-->
<template>
  <a-steps :current="current" :size="smallSize? 'small' :'default'" class="steps">
    <a-step :key="item.title" v-for="item in config">
      <template #title>{{item.title}}</template>
      <template #description v-if="item.desc">{{item.desc}}</template>
      <a-icon :type="item.icon" slot="icon" v-if="item.icon" />
    </a-step>
  </a-steps>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api';

interface StepsConfig {
  title: string;
  desc?: string;
  icon?: string;
}

const BaseSteps = createComponent({
  props: {
    config: Array,
    // Whether use small size
    smallSize: { type: Boolean, default: false },
    current: Number
  },
  model: {
    prop: 'current',
    event: 'change'
  }
});

export default BaseSteps;
</script>
<style scoped>
.steps {
  margin: 16px 5%;
  width: 90%;
}
</style>
