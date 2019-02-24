<template>
  <base-page :key="url" :pagedata="pageData" v-if="pageData"></base-page>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import BasePage from '@/components/BasePage.vue';
import { Route } from 'vue-router';

@Component({components: { BasePage }})
export default class Page extends Vue {
  private pageData: any[] = [];

  @Prop(String) private path!: string;

  // 加载页面
  private loadPage(path: string) {
    let jsonData: any[] = [];
    let finalPath = '';

    // 确定文件夹名称
    let { length } = path;

    while (!Number.isNaN(Number(path.charAt(length)))) length -= 1;
    const folder = path.substring(0, length + 1);

    if (Number.isNaN(Number(path.charAt(path.length - 1))))
      finalPath = `${path}0`;

    // 获得json文件
    $.ajax({
      async: false,
      url: `/Res/page/${folder}/${finalPath || path}.json`,
      dataType: 'text',
      success: data => {
        jsonData = JSON.parse(data);
      }
    });

    // 设置页面数据
    this.pageData = jsonData;
  }

  get url() {
    return this.$route.path;
  }

  private mounted() {
    this.loadPage(this.path);
  }

  @Watch('$route')
  private onRouteChange(to: Route, from: Route) {
    const paths = this.$route.path.split('/');

    this.loadPage(paths[paths.length - 1]);
  }
}
</script>
