<template>
  <a-menu :theme="theme" mode="horizontal" v-model="active">
    <a-menu-item key="logo" style="padding:0 10px 0 20px;">
      <transition name="myfade">
        <Back id="backButton" v-if="backButtonDisplay" />
      </transition>
      <transition name="myfade">
        <img alt="东师青年" id="logo" src="/img/icon/nenuyouth.png" v-if="logoDisplay" />
      </transition>
    </a-menu-item>
    <a-menu-item class="d-none d-lg-inline" disabled key="logoName" style="padding:0 10px 0 0;">
      <span class="text-black">东北师范大学学生会</span>
    </a-menu-item>
    <a-menu-item key="/">
      <router-link to="/">
        <a-icon type="home" />主页
      </router-link>
    </a-menu-item>
    <a-menu-item key="/guide">
      <router-link to="/guide">
        <a-icon type="bulb" />新生攻略
      </router-link>
    </a-menu-item>
    <!-- <a-sub-menu>
      <template #title>
        <span class="submenu-title-wrapper">
          <a-icon type="camera"/>东师风貌
        </span>
      </template>
      <a-menu-item key="scence:1">本部校区</a-menu-item>
      <a-menu-item key="scence:2">净月校区</a-menu-item>
    </a-sub-menu>
    <a-menu-item key="/about">
      <router-link to="/about">
        <a-icon type="fire"/>深入了解
      </router-link>
    </a-menu-item>
    <a-menu-item key="/about/question">
      <router-link to="/about/question">
        <a-icon type="question"/>疑难解答
      </router-link>
    </a-menu-item>-->
  </a-menu>
</template>
<script lang="ts">
import { computed, createComponent, onMounted, ref, watch } from '@vue/composition-api';
import Back from '|/icon/back.svg';

export default createComponent({
  name: 'Nav',
  components: { Back },
  setup(props, context) {
    const logoDisplay = ref(true);
    const backButtonDisplay = ref(false);
    const firstNavigate = ref(true);


    // 获得主题
    const theme = computed(() => this.$store.state.nightmode ? 'dark' : 'light');

    const active = computed({
      // 激活对应menu项
      get: () => [context.root.$store.state.path],
      // do nothing
      set: (newVal) => {
        if (newVal[0] === 'logo') context.root.$router.back();
      }
    });

    watch(() => context.root.$route, () => {
      if (firstNavigate.value) {
        firstNavigate.value = false;
        setTimeout(() => {
          logoDisplay.value = false;
          setTimeout(() => {
            backButtonDisplay.value = true;
          }, 500);
        }, 3000);
      }
    });
  }
});
</script>
<style lang='scss' scoped>
#nav {
  position: fixed;
  top: 0px;
  z-index: 100;
  width: 100vw;
  @media (max-width: 992px) {
    line-height: 38.6px;
  }
}

#backButton {
  margin-right: 0;
}

#logo {
  width: 18.4px;
  height: 18.4px;
  margin: 0 -2.2px;
}
</style>
