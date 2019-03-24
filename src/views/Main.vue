<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 主页
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-03-24 12:24:39
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
    <base-carousel v-bind="carouselData"></base-carousel>
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
            <router-link :to="`/guide/${item[1]}`">
              <div>
                <img :src="require(`@/icon/guide/${item[1]}.svg`)" class="guideIcon px-2 py-1">
                <div class="guideButtonDesc">{{ item[0] }}</div>
              </div>
            </router-link>
          </a-col>
        </a-row>
      </a-col>
      <a-col :xs="24">
        <h2 class="px-3 pt-3">东师校历</h2>
        <hr>
        <div style="max-height:600px;overflow-y: auto;">
          <base-time-axis :time-list="timeList"></base-time-axis>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseCarousel from '@/components/BaseCarousel.vue';
import BaseTimeAxis from '@/components/BaseTimeAxis.vue';

@Component({ components: { BaseCarousel, BaseTimeAxis } })
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

  private readonly timeList = [
    {
      title: '1946年',
      text: '东北师范大学建校'
    },
    {
      title: '2018年春季学期',
      text: '2018年3月15日(正月十八)——2018年7月20日(共20周)'
    },
    {
      title: '2018年暑假',
      text: '2018年7月21日-2018年9月2日(共6周)'
    },
    {
      title: '2018年秋季学期',
      text: '2018年9月3日-2019年1月18日(共20周)\n  (2月5日为春节，距春节17天)'
    },
    {
      title: '2019年寒假',
      text: '2019年1月19日-2019年3月3日(共6周)'
    },
    {
      title: '2019年春季学期',
      text: '2019年3月4日(正月二十八)——2019年7月12日(共19周)'
    },
    {
      title: '2019年暑假',
      text: '2019年7月13日-2019年8月25日(共6周)'
    },
    {
      title: '2019年秋季学期',
      text: '2019年8月26日-2020年1月10日(共20周)\n  (1月25日为春节，距春节15天)'
    },
    {
      title: '2020年寒假',
      text: '2019年1月11日-2020年2月23日(共6周)'
    },
    {
      title: '2020年春季学期',
      text: '2020年2月24日(二月初二)——2020年7月17日(共21周)'
    },
    {
      title: '2020年暑假',
      text: '2020年7月18日-2020年8月30日(共6周)'
    },
    {
      title: '2020年秋季学期',
      text: '2019年8月31日-2021年1月22日(共21周)\n  (2月12日为春节，距春节20天)'
    },
    {
      title: '2021年寒假',
      text: '2021年1月23日-2021年3月8日(共6周)'
    }
  ];
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
</style>
