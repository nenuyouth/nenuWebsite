<template functional>
  <a-sub-menu :key="props.menuInfo.key">
    <template v-slot:title>
      <span>
        <template v-if="props.menuInfo.type">
          <icon-font :type="props.menuInfo.type" v-if="props.menuInfo.type.slice(0,5)==='icon-'"/>
          <a-icon :type="props.menuInfo.type" v-else/>
        </template>
        <span class="icon" v-else-if="props.menuInfo.icon"/>
        <span>{{ props.menuInfo.title }}</span>
      </span>
    </template>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item :key="item.key" v-if="!item.children">
        <template v-if="item.type">
          <icon-font :type="item.type" v-if="item.type.slice(0,5)==='icon-'"/>
          <a-icon :type="item.type" v-else/>
        </template>
        <span class="icon" v-else-if="item.icon"/>
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
