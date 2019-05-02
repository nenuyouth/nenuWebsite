<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Base Menu子组件
 * @Date: 2019-03-25 12:39:59
 * @LastEditTime: 2019-05-02 20:28:44
-->
<template functional>
  <a-sub-menu :key="props.menuInfo.key">
    <template #title>
      <span>
        <template v-if="props.menuInfo.type">
          <icon-font :type="props.menuInfo.type" v-if="props.menuInfo.type.slice(0,5)==='icon-'"/>
          <a-icon :type="props.menuInfo.type" v-else/>
        </template>
        <span class="icon" v-else-if="props.menuInfo.icon"/>
        <span v-text="props.menuInfo.title"/>
      </span>
    </template>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item :key="item.key" v-if="!item.children">
        <template v-if="item.type">
          <icon-font :type="item.type" v-if="item.type.slice(0,5)==='icon-'"/>
          <a-icon :type="item.type" v-else/>
        </template>
        <span class="icon" v-else-if="item.icon"/>
        <span v-text="item.title"/>
      </a-menu-item>
      <sub-menu :key="item.key" :menu-info="item" v-else/>
    </template>
  </a-sub-menu>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { MenuList } from '@/store/module/slide';

@Component
export default class SubMenu extends Vue {
  @Prop(Object) private menuInfo!: MenuList;
}
</script>
