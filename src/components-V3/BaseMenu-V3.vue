<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Base Vertical Menu
 * @Date: 2019-03-25 12:39:59
 * @LastEditTime: 2019-08-25 21:13:28
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
          <span class="icon" v-if="item.icon===true" />
          <template v-else>
            <icon-font :type="item.icon" v-if="item.icon.slice(0,5)==='icon-'" />
            <a-icon :type="item.icon" v-else />
          </template>
        </template>
        <span v-text="item.title" />
      </a-menu-item>
      <SubMenu :key="item.key" :menu-info="item" v-else />
    </template>
  </a-menu>
</template>

<script lang='ts'>
import { computed, createComponent, ref } from '@vue/composition-api';
import Vue from 'vue';
import SubMenu from '#/BaseSubMenu.vue';
import { MenuItem } from '@/store/module/slide';

interface SelectEvent {
  domEvent: MouseEvent;
  item: Vue;
  key: string;
  keyPath: string[];
  selectedKeys: string[];
}

interface Props {
  list: MenuItem[];
}

export default createComponent<Props, {}>({
  name: 'BaseMenu',
  props: {
    // A list of menuItems to display
    list: { type: Array, required: true }
  },
  components: { SubMenu },
  setup(props, context) {

    // Menu collapse status
    const collapsed = ref(false);

    /*
     * Current selected menu => to show thie right active status in the menulist
     * V-model must has a setter, or an error will be triggered by vue
     * nothing to do, path has been handled in the main.ts
     */
    const active = computed({
      get: () => [context.root.$store.state.path],
      set: () => { }
    });

    // Change the theme according to the "nightmode" status
    const theme = computed(() => context.root.$store.state.nightmode ? 'dark' : 'light');

    // navigate to the menuitem page when clicking it
    const select = (event: SelectEvent) => {
      context.root.$router.push(event.key);
    };

    return {
      collapsed,
      active,
      theme,
      select
    };
  }
});
</script>
