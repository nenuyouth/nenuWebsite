<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 东师指南页面
 * @Date: 2019-03-24 11:14:13
 * @LastEditTime: 2019-12-02 21:29:50
-->
<template>
  <div class="container">
    <h2 class="px-3 pt-3">东师指南</h2>
    <BaseGrid v-for="item in guidelist" :key="item.head" v-bind="item" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseGrid from '#/BaseGrid.vue';

@Component({ components: { BaseGrid } })
export default class Guide extends Vue {
  private readonly guidelist = [];
}
</script>
<style lang="stylus" scoped>
.blockButton
  max-width 600px
  margin-left auto
  margin-right auto
  border-radius 15px
</style>
