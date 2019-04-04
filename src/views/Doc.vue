<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Internal Doc Display
 * @Date: 2019-04-01 23:35:43
 * @LastEditTime: 2019-04-01 23:50:17
-->
<template>
  <MyDoc :baselength="baselength" :loading="$store.state.docLoading" :path="path"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { MenuList } from '@/components/BaseSubMenu.vue';
import { Route } from 'vue-router';
import MyDoc from '@/components/MyDoc.vue';
import getCompiledMarkdown from '@/lib/getMarkdown';

@Component({ components: { MyDoc } })
export default class Doc extends Vue {
  // the length of url base part
  private readonly baselength = 5;

  // doc path
  private get path() {
    return this.$route.path.slice(this.baselength) || 'readme';
  }

  private activated() {
    // display menu
    this.$store.commit('menuList', require('@/assets/docMenuList.json'));
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
    this.$store.commit('docLoading', true);

    // if markdown of this page hasn't been cached
    if (!this.$store.state.compiledDoc[path])
      // decide whether nagivate or not based on the result of getting markdown files
      navigate = await getCompiledMarkdown(
        path,
        this,
        'compiledDoc',
        `/server/doc.php?password=${this.$store.state.internalPassword}&path=`
      );

    // invoke Hook
    next(navigate);
  }
}
</script>
