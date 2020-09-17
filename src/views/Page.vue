<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 自动生成界面
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-12-02 21:30:03
-->
<template>
  <keep-alive :max="5">
    <base-page v-if="pageData" :key="url" :pagedata="pageData" />
  </keep-alive>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BasePage from "#/BasePage.vue";
import { Route } from "vue-router";
import axios from "axios";

@Component({ components: { BasePage } })
export default class Page extends Vue {
  private pageData = "";

  @Prop(String) private readonly path!: string;

  // 加载页面
  private async loadPage(path: string, back = false) {
    let finalPath = "";
    let pathLength = path.length; // 确定文件夹名称
    let navigate = true;

    while (!Number.isNaN(Number(path.charAt(pathLength)))) pathLength -= 1;
    const folder = path.substring(0, pathLength + 1);

    if (Number.isNaN(Number(path.charAt(path.length - 1))))
      finalPath = `${path}0`;

    // 获得json文件
    await axios
      .post("https://mp.nenuyouth.com/server/page.php", {
        path: `${folder}/${finalPath || path}`,
      })
      .then((response) => {
        try {
          // 设置页面数据
          if (typeof response.data === "object")
            this.pageData = JSON.stringify(response.data);
          else throw response.data;
        } catch (err) {
          const router = this.$router;

          this.$confirm({
            title: "JSON 解析失败",
            content: "JSON 解析失败，请汇报给 Mr.Hope!",
            autoFocusButton: "cancel",
            cancelText: "确定",
            okText: "汇报",
            okType: "danger",
            onOk: () => {
              if (back) router.back();
              else navigate = false;
              window.open(
                "http://wpa.qq.com/msgrd?v=3&uin=1178522294&site=qq&menu=yes"
              );
            },
            onCancel: () => {
              if (back) router.back();
              else navigate = false;
            },
          });
        }
      });

    return navigate;
  }

  private get url() {
    return this.$route.path;
  }

  private activated() {
    const paths = this.$route.path.split("/");

    if (paths.length === 3 && (paths[1] === "guide" || paths[1] === "page"))
      this.loadPage(paths[paths.length - 1], true);
  }

  // change docPath
  private async beforeRouteUpdate(
    to: Route,
    from: Route,
    next: (navigate?: boolean) => void
  ) {
    const paths = to.path.split("/");
    const navigate =
      paths.length === 3 && (paths[1] === "guide" || paths[1] === "page")
        ? await this.loadPage(paths[paths.length - 1])
        : false;

    // invoke Hook
    next(navigate);
  }
}
</script>
