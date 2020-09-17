<!--
 * @Author: Mr.Hope
 * @Date: 2019-06-03 12:19:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-25 23:38:38
 * @Description: Private Main page
-->
<template>
  <div class="container">
    Private Page is building......
    <base-steps v-model="current" :config="config" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseSteps from "#/BaseSteps.vue";

@Component({ components: { BaseSteps } })
export default class Private extends Vue {
  private config = [
    { title: "张伯望", desc: "太帅了", icon: "home" },
    { title: "张伯望2" },
  ];

  private current = 0;
}
</script>
