<template functional>
  <a-sub-menu :key="props.menuInfo.key">
    <span slot="title">
      <a-icon type="mail"/>
      <span>{{ props.menuInfo.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item :key="item.key" v-if="!item.children">
        <a-icon type="pie-chart"/>
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
  children?: MenuList;
}

@Component
export default class SubMenu extends Vue {
  @Prop(Object) private menuInfo!: MenuList;
}
</script>
