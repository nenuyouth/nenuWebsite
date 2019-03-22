<template>
  <a-menu
    :defaultOpenKeys="['2']"
    :defaultSelectedKeys="['1']"
    :inlineCollapsed="collapsed"
    mode="inline"
    theme="light"
    v-model="currentList"
  >
    <template v-for="item in list">
      <a-menu-item :key="item.key" v-if="!item.children">
        <icon-font :type="item.type" v-if="item.icon"/>
        <a-icon :type="item.type" v-else-if="item.type"/>
        <span class="icon" v-else/>
        <span>{{item.title}}</span>
      </a-menu-item>
      <SubMenu :key="item.key" :menu-info="item" v-else/>
    </template>
  </a-menu>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import SubMenu, { MenuList } from '@/components/BaseSubMenu.vue';
import { Route } from 'vue-router';

@Component({ components: { SubMenu } })
export default class BaseMenu extends Vue {
  // 当前被选中的菜单列表
  private currentList = ['/'];

  // 是否展开
  private collapsed = false;

  // 菜单列表
  @Prop(Array) private list!: MenuList[];

  @Watch('$route')
  private onRouteChange(to: Route) {
    this.currentList = [to.path];
  }
}
</script>
