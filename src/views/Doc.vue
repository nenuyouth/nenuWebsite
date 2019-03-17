<template>
  <!-- <MyDoc :baselength="5" :loading="loading" :path="path"></MyDoc> -->
  <MyDoc :baselength="baselength" :loading="$store.state.docLoading" :path="path"></MyDoc>
</template>

<script lang="ts">
import MyDoc from '@/components/MyDoc.vue';
import { Component, Vue } from 'vue-property-decorator';
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

  // 文档路径改变
  private async beforeRouteUpdate(to: Route, from: Route, next: () => void) {
    console.info('Doc beforeRouteUpdate');
    const path = to.path.slice(this.baselength) || 'readme';

    // 显示加载状态
    this.$store.commit('docLoading', true);

    // 如果将转入的页面markdown未缓存
    if (!this.$store.state.compiledMarkdown[path])
      // 预先获取markdown文件
      await getCompiledMarkdown(path, this, '/server/doc.php?password=5201314&path=');

    // 继续导航
    next();
  }
}
</script>
