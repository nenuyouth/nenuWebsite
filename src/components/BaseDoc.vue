<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-15 20:56:30
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-15 21:00:28
 * @Description: Base Document
-->
<template>
  <div/>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseDoc extends Vue {
  // Component ID
  @Prop(Number) private readonly myId!: number;
}
</script>
<style scoped>
</style>
