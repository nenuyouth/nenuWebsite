<template>
  <div class="container">
    <h1>东北师大校历</h1>
    <hr />
    <div class="desc">点击学期查看学期详情</div>
    <base-time-line :time-list="timeList" />
  </div>
</template>
<script lang="ts">
import BaseTimeLine, { TimeListItem } from '#/BaseTimeLine.vue';
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component({ components: { BaseTimeLine } })
export default class Calendar extends Vue {
  private timeList: TimeListItem[] = [];

  private created() {
    axios
      .get('/config/calendar/main.json')
      .then(response => {
        this.timeList = response.data;
      })
      .catch(err => {
        this.$confirm({
          title: '校历获取错误',
          content: `校历获取失败，错误信息为${err}\n请汇报给 Mr.Hope!`,
          autoFocusButton: 'cancel',
          cancelText: '确定',
          okText: '汇报',
          okType: 'danger',
          onOk: () => {
            this.$router.back();
            window.open('http://wpa.qq.com/msgrd?v=3&uin=1178522294&site=qq&menu=yes');
          },
          onCancel: () => {
            this.$router.back();
          }
        });
      });
  }
}
</script>
<style scoped>
.desc {
  color: #888;
  text-align: right;
  font-size: 13px;
}
</style>
