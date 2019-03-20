<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: JSON文件编辑器
 * @Date: 2019-03-19 19:09:58
 * @LastEditTime: 2019-03-20 11:21:32
 -->
<template>
  <div>
    <div :key="part.text" v-for="part in json">
      <a-select @change="handleChange" defaultValue style="width: 200px">
        <a-select-opt-group>
          <span slot="label">
            <a-icon type="user"/>Manager
          </span>
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
        </a-select-opt-group>
        <a-select-opt-group label="Engineer">
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select-opt-group>
      </a-select>
      <a-input :key="config" v-for="config in configuration[part.tag]"></a-input>
      <a-divider orientation="right">
        <a-icon @click="addNew" type="plus-circle"/>
      </a-divider>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

export default class JsonEditor extends Vue {
  private Json = [];

  private handleChange(value: string) {
    // console.log(`selected ${value}`);
  }
}
</script>
<style>
</style>