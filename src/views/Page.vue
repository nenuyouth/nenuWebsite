<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 自动生成界面
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-03-20 00:43:05
 -->
<template>
  <base-page :key="url" :pagedata="pageData" v-if="pageData"></base-page>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import axios from 'axios';
import BasePage from '@/components/BasePage.vue';

@Component({ components: { BasePage } })
export default class Page extends Vue {
  private pageData = '';

  @Prop(String) private path!: string;

  // 加载页面
  private async loadPage(path: string) {
    let finalPath = '';

    // 确定文件夹名称
    let pathLength = path.length;

    while (!Number.isNaN(Number(path.charAt(pathLength)))) pathLength -= 1;
    const folder = path.substring(0, pathLength + 1);

    if (Number.isNaN(Number(path.charAt(path.length - 1)))) finalPath = `${path}0`;

    // 获得json文件
    await axios.get(`/Res/page/${folder}/${finalPath || path}.json`).then(response => {
      try {
        // 设置页面数据
        if (typeof response.data === 'object') this.pageData = JSON.stringify(response.data);
        else throw response.data;
      } catch (err) {
        const router = this.$router;

        this.$confirm({
          title: 'JSON解析失败',
          content: 'JSON解析失败，请汇报给Mr.Hope!',
          autoFocusButton: 'cancel',
          cancelText: '确定',
          okText: '汇报',
          okType: 'danger',
          onOk: () => {
            router.back();
            window.open('http://wpa.qq.com/msgrd?v=3&uin=1178522294&site=qq&menu=yes');
          },
          onCancel: () => {
            router.back();
          }
        });
      }
    });
  }

  private get url() {
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
