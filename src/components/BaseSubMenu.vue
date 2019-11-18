<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Base Menu子组件
 * @Date: 2019-03-25 12:39:59
 * @LastEditTime: 2019-08-10 14:21:19
-->
<template functional>
  <a-sub-menu :key="props.menuInfo.key">
    <template #title>
      <span>
        <template v-if="props.menuInfo.icon">
          <icon-font v-if="props.menuInfo.icon.slice(0,5)==='icon-'" :type="props.menuInfo.icon" />
          <a-icon v-else :type="props.menuInfo.icon" />
        </template>
        <span v-else-if="props.menuInfo.icon" class="icon" />
        <span v-text="props.menuInfo.title" />
      </span>
    </template>
    <template v-for="item in props.menuInfo.children">
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
      <sub-menu v-else :key="item.key" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { MenuItem } from '@/store/module/slide';

@Component
export default class SubMenu extends Vue {
  @Prop(Object) private readonly menuInfo!: MenuItem;
}
</script>
