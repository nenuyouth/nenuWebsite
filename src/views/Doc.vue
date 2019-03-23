<template>
  <MyDoc :baselength="baselength" :loading="$store.state.docLoading" :path="path"></MyDoc>
</template>

<script lang="ts">
import MyDoc from '@/components/MyDoc.vue';
import { Component, Vue } from 'vue-property-decorator';
import { MenuList } from '@/components/BaseSubMenu.vue';
import { Route } from 'vue-router';
import getCompiledMarkdown from '@/lib/getMarkdown';

@Component({ components: { MyDoc } })
export default class Doc extends Vue {
  // 文档基础路径长度
  private baselength = 5;

  // 文档路径
  private get path() {
    return this.$route.path.slice(this.baselength) || 'readme';
  }

  private mounted() {
    // 写入菜单
    this.$store.commit('menuList', require('@/assets/docMenuList.json'));
  }

  // 文档路径改变
  private async beforeRouteUpdate(to: Route, from: Route, next: (navigate?: boolean) => void) {
    const path = to.path.slice(this.baselength) || 'readme';
    let navigate = true;

    // 显示加载状态
    this.$store.commit('docLoading', true);

    // 如果将转入的页面markdown未缓存
    if (!this.$store.state.compiledMarkdown[path])
      // 通过获取markdown文件情况决定是否导航
      navigate = await getCompiledMarkdown(
        path,
        this,
        `/server/doc.php?password=${this.$store.state.internalPassword}&path=`
      );

    // 调用Hook，结束函数
    next(navigate);
  }

  private beforeDestroy() {
    this.$store.commit('menuList', []);
  }
}
</script>
