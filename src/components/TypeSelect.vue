<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-15 20:56:30
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-21 13:01:16
 * @Description: Type Select
-->
<template>
  <div>
    <!-- 选择需要的值类型 -->
    <a-radio-group
      :value="selected"
      @change="$emit('change',$event.target.value)"
      buttonStyle="solid"
    >
      <a-radio-button :key="item" :value="item" v-for="item in option">{{item}}</a-radio-button>
    </a-radio-group>
  </div>
</template>
<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TypeSelect extends Vue {
  // Option List
  @Prop(Array) private readonly option!: string[];

  // Select
  @Model('change', { type: String }) private selected!: string;

  // Select the first option by default
  private mounted() {
    this.$emit('change', this.option[0]);
  }
}
</script>
