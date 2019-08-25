<!--
 * @Author: Mr.Hope
 * @Date: 2019-06-26 20:26:14
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-25 23:58:14
 * @Description: 侧边栏组件
-->
<template>
  <aside>
    <div :style="collapse? '': 'left: 200px;'" @click="trigger" class="d-block d-lg-none slideBtn">
      <a-icon type="bars" v-if="collapse" />
      <a-icon type="close" v-else />
    </div>
    <div @click="trigger" class="slideMask" style="display:none;" />
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
        <img
          :src="$store.state.slide.icon||'/img/icon/nenuyouth.png'"
          alt="东北师范大学校学生会"
          class="asideIcon mr-1"
        />
        {{$store.state.slide.title||'东师青年'}}
      </div>
      <base-menu :list="$store.state.slide.list" />
    </a-layout-sider>
  </aside>
</template>
<script lang='ts'>
import { computed, createComponent, inject, ref, onMounted } from '@vue/composition-api';
import $ from 'jquery';
import BaseMenu from '#/BaseMenu.vue';

export default createComponent({
  name: 'Slide',
  components: { BaseMenu },
  setup(props, context) {
    // 菜单收起状态
    const collapse = ref(false);
    // 当前主题
    const theme = computed(() => context.root.$store.state.nightmode ? 'dark' : 'light');

    const trigger = () => {
      collapse.value = !collapse.value;
      $('.ant-layout-sider-children').css({ zIndex: collapse.value ? '-1' : '4' });
      if (collapse.value) $('.slideMask').fadeOut(200);
      else $('.slideMask').fadeIn(200);
    };

    const onBreakpoint = (broken: boolean) => {
      if (!broken) $('.slideMask').css({ display: 'none' });
      $('.ant-layout-sider-children').css({ zIndex: broken ? '-1' : '4' });
    };

    return { collapse, theme, trigger, onBreakpoint };
  }
});
</script>
<style lang='scss'>
.asideLogo {
  position: relative;
  color: #000;
  font-weight: 500;
  font-size: 16px;
  margin: 0 16px 0 24px;
  padding: 4px 0 8px 0;
  line-height: 40px;
}

.asideIcon {
  width: 18px;
  height: 18px;
  vertical-align: -0.22em;
  fill: currentColor;
  overflow: hidden;
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
  &::-webkit-scrollbar {
    display: none;
  }
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
  z-index: 3;
  left: 200px;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.15);
}
</style>
