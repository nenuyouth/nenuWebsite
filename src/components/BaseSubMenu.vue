<template functional>
  <a-sub-menu :key="props.menuInfo.key">
    <span slot="title">
      <icon-font :type="props.menuInfo.type" v-if="props.menuInfo.icon"/>
      <a-icon :type="props.menuInfo.type" v-else-if="props.menuInfo.type"/>
      <span class="icon" v-else/>
      <span>{{ props.menuInfo.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item :key="item.key" v-if="!item.children">
        <icon-font :type="item.type" v-if="item.icon"/>
        <a-icon :type="item.type" v-else-if="item.type"/>
        <span class="icon" v-else/>
        <span>{{ item.title }}</span>
      </a-menu-item>
      <sub-menu :key="item.key" :menu-info="item" v-else/>
    </template>
  </a-sub-menu>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

export interface MenuList {
  key: string;
  title: string;
  type?: string;
  icon?: boolean;
  children?: MenuList;
}

@Component
export default class SubMenu extends Vue {
  @Prop(Object) private menuInfo!: MenuList;
}
</script>
