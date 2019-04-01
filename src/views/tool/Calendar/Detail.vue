<template>
  <div class="container">
    <h1>东北师大2019年春季学期校历</h1>
    <div @click="$router.push('/tool/calendar')" class="backButton">
      返 回
      <br>主 页
    </div>
    <hr>
    <base-time-line :time-list="timeList"/>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import BaseTimeLine from '@/components/BaseTimeLine.vue';

@Component({ components: { BaseTimeLine } })
export default class Calendar extends Vue {
  private timeList = [];

  private created() {
    axios
      .get(`/Res/calendar/${this.$route.params.time}.json`)
      .then(response => {
        this.timeList = response.data;
      })
      .catch(err => {
        this.$confirm({
          title: '校历获取错误',
          content: `链接地址有误，错误信息为${err}\n请汇报给Mr.Hope!`,
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
.backButton {
  position: fixed;
  top: 80px;
  right: 0;
  background-color: #fff;
  padding: 6px 8px;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 600;
  color: #1c2c3a;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  -webkit-box-shadow: -2px 0 5px rgba(0, 0, 0, 0.15);
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.15);
}
.backButton:hover {
  background-color: rgba(0, 0, 0, 0.15);
}
</style>
