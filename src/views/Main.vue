<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 主页
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-05-02 19:30:48
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
        <a class="btn btn-primary btn-lg" href="#" role="button">了解校学生会</a>
      </p>
    </div>
    <base-carousel v-bind="carouselData"/>
    <a-row>
      <a-col :xs="24">
        <h2 class="px-3 pt-3">东师指南</h2>
        <hr>
        <a-row>
          <a-col
            :key="item[1]"
            :lg="2"
            :md="4"
            :xs="6"
            class="guideListButton"
            v-for="item in guidelist"
          >
            <router-link :to="`/handbook/${item[1]}`">
              <div>
                <img :src="`/img/icon/guide/${item[1]}.svg`" class="guideIcon px-2 py-1">
                <div class="guideButtonDesc">{{ item[0] }}</div>
              </div>
            </router-link>
          </a-col>
        </a-row>
      </a-col>
      <a-col :xs="24">
        <h2 class="px-3 pt-3">东师校历</h2>
        <hr>
        <div class="calendarHolder">
          <base-time-line :time-list="timeList"/>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import BaseCarousel from '@/components/BaseCarousel.vue';
import BaseTimeLine from '@/components/BaseTimeLine.vue';

@Component({ components: { BaseCarousel, BaseTimeLine } })
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

  private guidelist = [
    ['报到', 'check'],
    ['寝室', 'dorm'],
    ['生活', 'life'],
    ['食堂', 'dining'],
    ['校园卡', 'card'],
    ['校园网', 'network'],
    ['学习', 'study'],
    ['附近', 'nearby'],
    ['学生组织', 'studentOrg'],
    ['社团', 'corporation'],
    ['资助', 'subsidize'],
    ['交通', 'traffic']
  ];

  private timeList = [];

  private created() {
    axios
      .post('/server/calendar.php', { time: 'main' })
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
.guideListButton {
  padding: 0.375rem 0.75rem;
  border: 1px solid #dee2e6;
  vertical-align: middle;
  background-color: #fff;
  text-align: center;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
}

.guideListButton:hover {
  background-color: #f8f8f8;
}

.guideIcon {
  max-width: 100%;
}
.guideButtonDesc {
  text-align: center;
  color: #212529;
  padding: 0.25em 0;
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
