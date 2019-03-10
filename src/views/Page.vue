<template>
  <base-page :key="url" :pagedata="pageData" v-if="pageData"></base-page>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import BasePage from '@/components/BasePage.vue';
import { Route } from 'vue-router';

@Component({ components: { BasePage } })
export default class Page extends Vue {
  private pageData: any[] = [];

  @Prop(String) private path!: string;

  // 加载页面
  private loadPage(path: string) {
    let jsonData: any[] = [];
    let finalPath = '';

    // 确定文件夹名称
    let pathLength = path.length;

    while (!Number.isNaN(Number(path.charAt(pathLength)))) pathLength -= 1;
    const folder = path.substring(0, pathLength + 1);

    if (Number.isNaN(Number(path.charAt(path.length - 1)))) finalPath = `${path}0`;

    // 获得json文件
    $.ajax({
      async: false,
      url: `/Res/page/${folder}/${finalPath || path}.json`,
      dataType: 'text',
      success: data => {
        try {
          jsonData = JSON.parse(data);
        } catch (err) {
          console.warn('JSON解析失败');
        }
      }
    });

    // 设置页面数据
    this.pageData = jsonData;
  }

  get url() {
    return this.$route.path;
  }

  private mounted() {
    const paths = this.$route.path.split('/');

    if (paths.length > 2) this.loadPage(paths[paths.length - 1]);
  }

  @Watch('$route')
  private onRouteChange(to: Route, from: Route) {
    const paths = this.$route.path.split('/');

    if (paths.length > 2) this.loadPage(paths[paths.length - 1]);
  }
}
</script>
