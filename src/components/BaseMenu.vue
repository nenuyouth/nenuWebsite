<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Base Vertical Menu
 * @Date: 2019-03-25 12:39:59
 * @LastEditTime: 2019-05-05 15:42:46
-->
<template>
  <a-menu
    :defaultOpenKeys="['2']"
    :defaultSelectedKeys="['1']"
    :inlineCollapsed="collapsed"
    :theme="theme"
    @select="select"
    mode="inline"
    v-model="active"
  >
    <template v-for="item in list">
      <a-menu-item :key="item.key" v-if="!item.children">
        <template v-if="item.icon">
          <span class="icon" v-if="item.icon===true"/>
          <template v-else>
            <icon-font :type="item.icon" v-if="item.icon.slice(0,5)==='icon-'"/>
            <a-icon :type="item.icon" v-else/>
          </template>
        </template>
        <span v-text="item.title"/>
      </a-menu-item>
      <SubMenu :key="item.key" :menu-info="item" v-else/>
    </template>
  </a-menu>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import SubMenu from '@/components/BaseSubMenu.vue';
import { MenuItem } from '@/store/module/slide';
import { Route } from 'vue-router';

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
