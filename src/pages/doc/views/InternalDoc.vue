<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Internal Doc Display
 * @Date: 2019-04-01 23:35:43
 * @LastEditTime: 2019-08-25 23:36:29
-->
<template>
  <MyDoc :baselength="baselength" :loading="$store.state.docLoading" :path="path" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import MyDoc from '../components/MyDoc.vue';
import getCompiledMarkdown from '../utils/getMarkdown';

@Component({ components: { MyDoc } })
export default class InternalDoc extends Vue {
  // the length of url base part
  private readonly baselength = 13;

  // doc path
  private get path() {
    return this.$route.path.slice(this.baselength) || 'readme';
  }

  private activated() {
    // display menu
    this.$store.commit('menuList', require('../assets/docMenuList'));
    this.$store.commit('menuTitle', '内部文档');
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
    if (!this.$store.state.compiledDoc[path])
      // decide whether nagivate or not based on the result of getting markdown files
      navigate = await getCompiledMarkdown(
        '/server/doc',
        {
          path,
          password: this.$store.state.password.internal
        },
        this,
        'compiledDoc'
      );

    // invoke Hook
    next(navigate);
  }
}
</script>
