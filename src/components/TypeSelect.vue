<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-15 20:56:30
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-01 22:58:10
 * @Description: Type Select
-->
<template>
  <!-- 选择需要的值类型 -->
  <a-radio-group
    :value="selected"
    button-style="solid"
    @change="onChange($event.target.value)"
  >
    <a-radio-button v-for="item in option" :key="item" :value="item">{{
      item
    }}</a-radio-button>
  </a-radio-group>
</template>
<script lang="ts">
import { Component, Inject, Model, Prop, Vue } from "vue-property-decorator";

@Component
export default class TypeSelect extends Vue {
  // Option List
  @Prop(Array) private readonly option!: string[];

  // Form value identifier
  @Prop(String) private readonly identifier!: string;

  // Select
  @Model("change", { type: String }) private selected!: string;

  @Inject() private form!: any;

  private mounted() {
    // If the select value is not seted, select the first option by default
    if (this.selected === "") this.$emit("change", this.option[0]);
  }

  private onChange(value: string) {
    this.$emit("change", value);
  }
}
</script>
