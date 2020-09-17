<!--
 * @Author: Mr.Hope
 * @Date: 2019-06-03 12:19:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-25 23:38:32
 * @Description: JSON修改
-->
<template>
  <div class="container">
    <base-steps v-model="current" :config="config" />
    <json-select v-if="current === 0" @json="pageJson = $event" @next="next" />
    <div class="footBtnCtn">
      <a-button
        v-if="current + 1 === config.length"
        type="primary"
        @click="done"
        v-text="'完成'"
      />
      <a-button v-else type="primary" @click="next" v-text="'下一步'" />
      <a-button v-if="current !== 0" @click="previous" v-text="'上一步'" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseSteps from "#/BaseSteps.vue";
import JsonSelect from "../components/JsonSelect.vue";

@Component({ components: { BaseSteps, JsonSelect } })
export default class Private extends Vue {
  private config = [
    { title: "选择类型" },
    { title: "编辑JSON" },
    { title: "预览页面" },
    { title: "保存或上传" },
  ];

  private current = 0;

  private pageJson = "";

  private next() {
    this.current += 1;
  }

  private previous() {
    this.current -= 1;
  }
}
</script>
<style scoped>
.footBtnCtn {
  display: flex;
  flex-direction: row-reverse;
  width: 90%;
  margin: 16px 5%;
  justify-content: space-between;
  align-items: center;
}
</style>
