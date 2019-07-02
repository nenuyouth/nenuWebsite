<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-15 20:56:30
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-02 21:34:04
 * @Description: Dropdown Grid
-->
<template>
  <a-divider orientation="left">
    <a-dropdown>
      <a class="ant-dropdown-link">
        {{selectedText}}
        <a-icon type="down" />
      </a>
      <template #overlay>
        <a-menu class="popMenu">
          <template v-for="(menulist, menuIndex) in list">
            <a-menu-item :key="menulist.title" disabled v-text="menulist.title" />
            <!-- <a-menu-divider v-if="index!==0" /> -->
            <a-row :key="`${menulist.title}-content`">
              <a-col :key="item.text" span="6" v-for="(item,index) in menulist.content">
                <a-menu-item @click="itemChange(menuIndex,index)">
                  <icon-font
                    :type="item.icon"
                    class="popMenuIcon"
                    v-if="item.icon.slice(0,5)==='icon-'"
                  />
                  <a-icon :type="item.icon" class="popMenuIcon" v-else />
                  <div v-text="item.text" />
                </a-menu-item>
              </a-col>
            </a-row>
          </template>
        </a-menu>
      </template>
    </a-dropdown>
  </a-divider>
</template>
<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator';

interface GridMenuItem {
  text: string;
  id: string;
  icon: string;
}

export interface GridMenuList {
  title: string;
  content: GridMenuItem[];
}

@Component
export default class DropdownGrid extends Vue {
  // Menu List
  @Prop(Array) private readonly list!: GridMenuList[];

  // Internal selected Data
  @Model('change', { type: String }) private selected!: string;

  // Displayed selected Data
  private selectedText = '请选择';

  private itemChange(menuIndex: number, index: number) {
    this.selectedText = this.list[menuIndex].content[index].text;
    this.$emit('change', this.list[menuIndex].content[index].id);
    this.$emit('onChange', this.list[menuIndex].content[index].text);
  }

  private mounted() {
    if (this.selected !== '请选择')
      this.list.forEach(menuList => {
        menuList.content.forEach(element => {
          if (this.selected === element.id) this.selectedText = element.text;
        });
      });
  }
}
</script>
<style scoped>
.popMenu {
  width: 500px;
  max-width: 90%;
}
.popMenuIcon {
  margin: 4px auto;
  font-size: 24px;
}
</style>
