<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Base Vertical Menu
 * @Date: 2019-03-25 12:39:59
 * @LastEditTime: 2019-11-07 16:17:51
-->
<template>
  <a-menu
    v-model="active"
    :default-open-keys="['2']"
    :default-selected-keys="['1']"
    :inline-collapsed="collapsed"
    :theme="theme"
    mode="inline"
    @select="select"
  >
    <template v-for="item in list">
      <a-menu-item v-if="!item.children" :key="item.key">
        <template v-if="item.icon">
          <span v-if="item.icon===true" class="icon" />
          <template v-else>
            <icon-font v-if="item.icon.slice(0,5)==='icon-'" :type="item.icon" />
            <a-icon v-else :type="item.icon" />
          </template>
        </template>
        <span v-text="item.title" />
      </a-menu-item>
      <SubMenu v-else :key="item.key" :menu-info="item" />
    </template>
  </a-menu>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MenuItem } from '@/store/module/slide';
import SubMenu from '#/BaseSubMenu.vue';

interface SelectEvent {
  domEvent: MouseEvent;
  item: Vue;
  key: string;
  keyPath: string[];
  selectedKeys: string[];
}

@Component({ components: { SubMenu } })
export default class BaseMenu extends Vue {
  // A list of menuItems to display
  @Prop(Array) private readonly list!: MenuItem[];

  // Menu collapse status
  private collapsed = false;

  // Current selected menu => to show thie right active status in the menulist
  private get active() {
    return [this.$store.state.path];
  }

  // V-model must has a setter, or an error will be triggered by vue
  private set active(active) {
    // nothing to do, path has been handled in the main.ts
  }

  // Change the theme according to the "nightmode" status
  private get theme() {
    return this.$store.state.nightmode ? 'dark' : 'light';
  }

  // navigate to the menuitem page when clicking it
  private select(e: SelectEvent) {
    this.$router.push(e.key);
  }
}
</script>
