<!--
 * @Author: Mr.Hope
 * @Date: 2019-06-03 12:19:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-02 13:06:16
 * @Description: Private Main page
-->
<template>
  <div class="container">
    Private Page is building......
    <base-steps :config="config" v-model="current" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseSteps from '#/BaseSteps.vue';

@Component({ components: { BaseSteps } })
export default class Private extends Vue {
  private config = [
    { title: '张伯望', desc: '太帅了', icon: 'home' },
    { title: '张伯望2' }
  ];

  private current = 0;
}
</script>
