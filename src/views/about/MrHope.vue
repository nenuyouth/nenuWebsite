<template>
  <base-page :pagedata="pageData" v-if="pageData"></base-page>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import BasePage from '#/BasePage.vue';

@Component({ components: { BasePage } })
export default class Department extends Vue {
  private pageData = '';

  private async mounted() {
    // 获得json文件
    await axios.post('/server/page.php', { path: 'MrHope/MrHope1' }).then(response => {
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
}
</script>
