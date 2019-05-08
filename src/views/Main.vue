<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 主页
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-05-08 14:18:25
-->
<template>
  <div class="container">
    <div class="jumbotron text-left">
      <h1>青春遇见梦想</h1>
      <h1>&nbsp;&nbsp;而我刚好在场</h1>
      <p class="lead">东北师范大学校学生会</p>
      <hr class="my-4">
      <p>人格的典范，学习的楷模</p>
      <p class="lead">
        <a-button @click="$router.push('/intro/studentUnion')" size="large" type="primary">了解校学生会</a-button>
      </p>
    </div>
    <base-carousel v-bind="carouselData"/>
    <h2 class="px-3 pt-3">东师指南</h2>
    <BaseGrid :content="guidelist"/>
    <h2 class="px-3 pt-3">东师手册</h2>
    <a-button block class="mb-3 blockButton" type="primary">
      <router-link to="/guide">点击进入</router-link>
    </a-button>
    <h2 class="px-3 pt-3">东师校历</h2>
    <div class="calendarHolder">
      <base-time-line :time-list="timeList"/>
    </div>
    <div class="text-center">
      <a-button block class="mb-3 blockButton" type="primary">
        <router-link to="/tool/calendar">查看详情</router-link>
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import BaseCarousel from '@/components/BaseCarousel.vue';
import BaseGrid from '@/components/BaseGrid.vue';
import BaseTimeLine from '@/components/BaseTimeLine.vue';

@Component({ components: { BaseCarousel, BaseGrid, BaseTimeLine } })
export default class Main extends Vue {
  private carouselData = {
    myId: 'Main',
    content: [
      {
        caption: 'NENUYouth',
        subCaption: '东师微信小程序已上线',
        ensubCaption: 'Wechat Miniprogram is released！',
        alt: '东师微信小程序已上线',
        src: '/img/main/main0.jpg',
        url: 'https://mp.weixin.qq.com/s/w_CbkYVuTcByXCxEnlJ63w',
        desc: '点击查看图文详情',
        black: true
      },
      {
        caption: '我是东师',
        subCaption: '未来，请多指教',
        ensubCaption: 'New Experience, New Us!',
        alt: '未来，请多指教',
        src: '/img/main/main1.jpg',
        url: 'https://mp.weixin.qq.com/s/yv66H-tCPyrHuSEc1cOK5Q',
        desc: '点击查看图文详情'
      },
      {
        caption: '东师姑娘',
        subCaption: '这里有一首歌唱给你听',
        ensubCaption: 'We prepare a song for you, girls.',
        src: '/img/main/main2.jpg',
        url: 'https://mp.weixin.qq.com/s/QcPo0a57ZY-aI5PWXbM7tA',
        alt: '这里有一首歌唱给你听',
        desc: '点击查看图文详情'
      }
    ]
  };

  private guidelist = require('@/assets/handbook.json');

  private timeList = [];

  private created() {
    axios
      .get('/config/calendar/2019spring.json')
      .then(response => {
        this.timeList = response.data;
      })
      .catch(err => {
        this.$confirm({
          title: '校历获取错误',
          content: `校历获取失败，错误信息为${err}\n请汇报给Mr.Hope!`,
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
.blockButton {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
}
.calendarHolder {
  padding: 0 15px;
  max-height: 300px;
  overflow-y: auto;
}
.calendarHolder::-webkit-scrollbar {
  display: none;
}
</style>
