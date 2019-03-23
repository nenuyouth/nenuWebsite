<template>
  <a-layout-sider
    @breakpoint="onBreakpoint"
    @collapse="onCollapse"
    breakpoint="lg"
    collapsedWidth="0"
    id="slide"
    theme="light"
  >
    <div class="asideLogo">
      <img alt="东北师范大学校学生会" class="icon mr-1" src="/img/icon/nenuyouth.png">
      校学生会
    </div>
    <base-menu :list="$store.state.menuList"></base-menu>
  </a-layout-sider>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import BaseMenu from '@/components/BaseMenu.vue';

@Component({ components: { BaseMenu } })
export default class Slide extends Vue {
  private onCollapse(collapsed: boolean, type: string) {
    console.log(collapsed, type);
  }

  private onBreakpoint(broken: boolean) {
    console.log(broken);
  }
}
</script>
<style scoped>
.asideLogo {
  margin: 0 16px 0 24px;
  padding: 4px 0 8px 0;
  line-height: 40px;
}
.ant-layout-sider-zero-width-trigger {
  z-index: 100;
}
</style>
