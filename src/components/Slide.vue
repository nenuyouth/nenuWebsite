<template>
  <aside>
    <a-layout-sider
      :theme="theme"
      :trigger="null"
      @breakpoint="onBreakpoint"
      breakpoint="lg"
      collapsedWidth="0"
      id="slide"
      v-model="collapse"
    >
      <div class="asideLogo" v-if="!collapse">
        <img alt="东北师范大学校学生会" class="icon mr-1" src="/img/icon/nenuyouth.png">
        东师青年
      </div>
      <base-menu :list="$store.state.menuList"></base-menu>
    </a-layout-sider>
    <div :style="collapse?'':'left: 200px;'" @click="trigger" class="d-block d-lg-none slideBtn">
      <a-icon type="bars" v-if="collapse"/>
      <a-icon type="close" v-else/>
    </div>
    <div @click="trigger" class="slideMask" style="display:none;"/>
  </aside>
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

  private trigger() {
    this.collapse = !this.collapse;
    $('.ant-layout-sider-children').css({ zIndex: this.collapse ? '-1' : '4' });
    if (this.collapse) $('.slideMask').fadeOut(200);
    else $('.slideMask').fadeIn(200);
  }

  private onBreakpoint(broken: boolean) {
    if (!broken) $('.slideMask').css({ display: 'none' });
    $('.ant-layout-sider-children').css({ zIndex: broken ? '-1' : '4' });
  }
}
</script>
<style>
.asideLogo {
  position: relative;
  margin: 0 16px 0 24px;
  padding: 4px 0 8px 0;
  line-height: 40px;
}

#aside {
  flex: none;
  align-self: stretch;
  background-color: #fff;
}
#slide {
  display: flex;
  flex-direction: column;
}
/* 保持slide内部元素固定并与屏幕同高可以滚动 */
.ant-layout-sider-children {
  position: fixed;
  width: 100%;
  max-width: 200px;
  z-index: 4;
  top: 0px;
  height: 100vh;
  overflow-x: visible;
  overflow-y: auto;
}
.ant-layout-sider-children::-webkit-scrollbar {
  display: none;
}
.slideBtn {
  position: fixed;
  z-index: 99;
  top: 5rem;
  left: 0;
  padding: 6px 10px;
  font-size: 18px;
  background-color: #fff;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  -webkit-box-shadow: 3px 0 6px rgba(0, 0, 0, 0.15);
  box-shadow: 3px 0 6px rgba(0, 0, 0, 0.15);
  transition-property: left;
  transition-duration: 0.2s;
  transition-timing-function: ease;
}

.slideMask {
  position: fixed;
  z-index: 98;
  left: 200px;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.15);
}
</style>
