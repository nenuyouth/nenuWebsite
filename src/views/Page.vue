<template>
  <base-page :key="url" :pagedata="pageData" v-if="pageData"></base-page>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import BasePage from "@/components/BasePage.vue";
import { Route } from "vue-router";

@Component({
  components: { BasePage }
})
export default class Page extends Vue {
  private pageData: any[] = [];

  @Prop(String) private path!: string;

  // 加载页面
  private loadPage(path: string) {
    let jsonData: any[] = [];
    let finalPath = "";

    // 确定文件夹名称
    let length = path.length;
    while (!isNaN(Number(path.charAt(length)))) length--;
    const folder = path.substring(0, length + 1);
    if (isNaN(Number(path.charAt(path.length - 1)))) finalPath = `${path}0`;

    // 获得json文件
    $.ajax({
      async: false,
      url: `/Res/page/${folder}/${finalPath ? finalPath : path}.json`,
      dataType: "text",
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

  @Watch("$route")
  private onRouteChange(to: Route, from: Route) {
    const paths = this.$route.path.split("/");
    this.loadPage(paths[paths.length - 1]);
  }
}
// export default {
//   data: () => ({
//     pageData: []
//   }),
//   props: {
//     path: String
//   },
//   components: {
//     BasePage
//   },
//   methods: {
//     loadPage(path) {
//       let jsonData;
//       let finalPath = "";

//       // 确定文件夹名称
//       let length = path.length;
//       while (!isNaN(path.charAt(length))) length--;
//       const folder = path.substring(0, length + 1);
//       if (isNaN(path.charAt(path.length - 1))) finalPath = `${path}0`;

//       // 获得json文件
//       $.ajax({
//         async: false,
//         url: `/Res/page/${folder}/${finalPath ? finalPath : path}.json`,
//         dataType: "text",
//         success: data => {
//           jsonData = JSON.parse(data);
//         }
//       });

//       // 设置页面数据
//       this.pageData = jsonData;
//     }
//   },
//   computed: {
//     url() {
//       return this.$route.path;
//     }
//   },
//   mounted() {
//     this.loadPage(this.path);
//   },
//   watch: {
//     $route(to, from) {
//       const paths = this.$route.path.split("/");
//       this.loadPage(paths[paths.length - 1]);
//     }
//   }
// };
</script>
