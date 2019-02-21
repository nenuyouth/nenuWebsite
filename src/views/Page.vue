<template>
  <base-page :key="url" :pagedata="pageData" v-if="pageData"></base-page>
</template>
<script>
import BasePage from "@/components/BasePage.vue";

export default {
  data: () => ({
    pageData: []
  }),
  props: {
    path: String
  },
  components: {
    BasePage
  },
  methods: {
    loadPage(path) {
      let jsonData;
      let finalPath;

      // 初始化path
      if (isNaN(path.charAt(path.length - 1))) finalPath = `${path}0`;
      else finalPath = path;
      // 获得json文件
      $.ajax({
        async: false,
        url: `/Res/page/${finalPath.slice(0, -1)}/${finalPath}.json`,
        dataType: "text",
        success: data => {
          jsonData = JSON.parse(data);
        }
      });
      //设置页面数据
      this.pageData = jsonData;
    }
  },
  computed: {
    url() {
      return this.$route.path;
    }
  },
  mounted() {
    this.loadPage(this.path);
  },
  watch: {
    $route(to, from) {
      const paths = this.$route.path.split("/");
      this.loadPage(paths[paths.length - 1]);
    }
  }
};
</script>
