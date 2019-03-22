<template>
  <a-layout-sider
    @breakpoint="onBreakpoint"
    @collapse="onCollapse"
    breakpoint="lg"
    collapsedWidth="0"
    id="slide"
    theme="light"
  >
    <a-menu mode="inline" theme="light">
      <a-menu-item disabled key="title">
        <img alt="东北师范大学校学生会" class="icon mr-1" src="/img/icon/nenuyouth.png">
        校学生会
      </a-menu-item>
      <base-menu :list="menuList"></base-menu>
    </a-menu>
    <!-- <a-menu :defaultSelectedKeys="['4']" mode="inline" theme="light">
      <a-menu-item key="1">
        <a-icon type="user"/>
        <span class="nav-text">nav 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="video-camera"/>
        <span class="nav-text">nav 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="upload"/>
        <span class="nav-text">nav 3</span>
      </a-menu-item>
      <a-menu-item key="4">
        <a-icon type="user"/>
        <span class="nav-text">nav 4</span>
      </a-menu-item>
    </a-menu>-->
  </a-layout-sider>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import BaseMenu from '@/components/BaseMenu.vue';

@Component({ components: { BaseMenu } })
export default class Slide extends Vue {
  // 菜单列表
  private get menuList() {
    return this.$store.state.slide;
  }
  // private menuList = [
  //   {
  //     key: '1',
  //     title: 'Option 1'
  //   },
  //   {
  //     key: '2',
  //     title: 'Navigation 2',
  //     children: [
  //       {
  //         key: '2.1',
  //         title: 'Navigation 3',
  //         children: [
  //           {
  //             key: '2.1.1',
  //             title: 'Option 2.1.1'
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ];

  private onCollapse(collapsed: boolean, type: string) {
    console.log(collapsed, type);
  }

  private onBreakpoint(broken: boolean) {
    console.log(broken);
  }
}
</script>
<style scoped>
.slideIcon {
  width: 18px;
  height: 18px;
}
.ant-layout-sider-zero-width-trigger {
  z-index: 100;
}
</style>
