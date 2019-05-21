<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-15 20:56:30
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-21 16:46:59
 * @Description: Dropdown Title
-->
<template>
  <a-divider orientation="left">
    <a-dropdown>
      <a class="ant-dropdown-link">
        {{selectedText}}
        <a-icon type="down"/>
      </a>
      <template #overlay>
        <a-menu>
          <template v-for="(item,index) in menu">
            <template v-if="item[1]==='TITLE'">
              <a-menu-divider :key="`divider${index}`" v-if="index!==0"/>
              <a-menu-item :key="`title${index}`" disabled v-text="item[0]"/>
            </template>
            <a-menu-item :key="`item${index}`" @click="itemChange(index)" v-else v-text="item[0]"/>
          </template>
        </a-menu>
      </template>
    </a-dropdown>
  </a-divider>
</template>
<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DropdownTitle extends Vue {
  // Menu List
  @Prop(Array) private readonly menu!: string[][];

  // Internal selected Data
  @Model('change', { type: String }) private selected!: string;

  // Displayed selected Data
  private selectedText = '请选择';

  private itemChange(index: number) {
    this.selectedText = this.menu[index][0];
    this.$emit('change', this.menu[index][1]);
    this.$emit('onChange', this.menu[index][0]);
  }

  private mounted() {
    if (this.selected !== '请选择')
      this.menu.forEach(element => {
        if (this.selected === element[1]) this.selectedText = element[0];
      });
  }
}
</script>
