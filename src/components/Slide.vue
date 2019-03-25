<template>
  <a-layout-sider :theme="theme" breakpoint="lg" collapsedWidth="0" v-model="collapse">
    <span slot="trigger">
      <a-icon type="bars" v-if="collapse"/>
      <a-icon type="close" v-else/>
    </span>
    <div class="asideLogo" v-if="!collapse">
      <img alt="东北师范大学校学生会" class="icon mr-1" src="/img/icon/nenuyouth.png">
      东师青年
    </div>
    <base-menu :list="$store.state.menuList"></base-menu>
  </a-layout-sider>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import BaseMenu from '@/components/BaseMenu.vue';

@Component({ components: { BaseMenu } })
export default class Slide extends Vue {
  // 菜单收起状态
  private collapse = false;

  private get theme() {
    return this.$store.state.nightmode ? 'dark' : 'light';
  }

  @Watch('collapse')
  private onCollapseChange(to: boolean) {
    $('.ant-layout-sider-children').css({ width: to ? '0px' : '' });
  }
}
</script>
<style scoped>
.asideLogo {
  position: relative;
  margin: 0 16px 0 24px;
  padding: 4px 0 8px 0;
  line-height: 40px;
}

.triggerCtn {
  z-index: 1000;
  top: 5rem;
  position: fixed;
}
</style>
<style>
#sider {
  height: 100vh;
}

/* 保持slide内部元素固定并与屏幕同高可以滚动 */
.ant-layout-sider-children {
  width: 200px;
  position: fixed;
  z-index: 4;
  top: 0px;
  height: 100%;
  overflow-y: auto;
}
.ant-layout-sider-children::-webkit-scrollbar {
  display: none;
}
/* @media (max-width: 992px) { */
.ant-layout-sider-zero-width-trigger {
  z-index: 100;
  top: 5rem;
  left: 100%;
  position: absolute;
  -webkit-box-shadow: 2px 0 5px rgba(0, 0, 0, 0.15);
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.15);
}
/* } */
</style>
