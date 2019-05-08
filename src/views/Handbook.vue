<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 东师指南页面
 * @Date: 2019-03-24 11:14:13
 * @LastEditTime: 2019-05-08 14:19:06
-->
<template>
  <div class="container">
    <h2 class="px-3 pt-3">东师指南</h2>
    <BaseGrid :key="item.head" v-bind="item" v-for="item in guidelist"/>
    <h2 class="px-3 pt-3">东师手册</h2>
    <a-button block class="my-3 blockButton" type="primary">
      <router-link to="/guide">点击进入</router-link>
    </a-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseGrid from '@/components/BaseGrid.vue';

@Component({ components: { BaseGrid } })
export default class Guide extends Vue {
  private readonly guidelist = require('@/assets/handbookList.json');
}
</script>
<style scoped>
.blockButton {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
}
</style>
