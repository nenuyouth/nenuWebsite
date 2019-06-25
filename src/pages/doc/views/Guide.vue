<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Guide Doc display
 * @Date: 2019-04-01 16:10:20
 * @LastEditTime: 2019-06-25 10:18:36
-->
<template>
  <MyGuide :baselength="baselength" :loading="$store.state.docLoading" :path="path"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import MyGuide from '../components/MyGuide.vue';
import getCompiledMarkdown from '../utils/getMarkdown';

@Component({ components: { MyGuide } })
export default class Guide extends Vue {
  // the length of url base part
  private baselength = 5;

  // doc path
  private get path() {
    return this.$route.path.slice(this.baselength) || 'readme';
  }

  private activated() {
    // display menu
    this.$store.commit('menuList', require('../assets/guideMenuList'));
    this.$store.commit('menuTitle', '东师指南');
  }
  private deactivated() {
    // hide menu
    this.$store.commit('menuList', []);
  }

  // change docPath
  private async beforeRouteUpdate(to: Route, from: Route, next: (navigate?: boolean) => void) {
    const path = to.path.slice(this.baselength) || 'readme';
    let navigate = true;

    // show loading status
    this.$store.commit('loadDoc', true);

    // if markdown of this page hasn't been cached
    if (!this.$store.state.compiledGuide[path])
      // decide whether nagivate or not based on the result of getting markdown files
      navigate = await getCompiledMarkdown('/server/guide', { path }, this, 'compiledGuide');

    // invoke Hook
    next(navigate);
  }
}
</script>
