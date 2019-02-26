<template>
  <div id="body">
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
    <div class="container">
      <base-carousel v-bind="carouselData"></base-carousel>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-6">
          <h2 class="px-3 pt-3">东师指南</h2>
          <hr>
          <div class="row">
            <div class="w-100"></div>
            <router-link
              :key="item[1]"
              :to="`/guide/${item[1]}`"
              class="col-3 col-md-2 guideListButton"
              v-for="item in guidelist"
            >
              <img :src="require(`@/icon/guide/${item[1]}.svg`)" class="img-fluid px-2 py-1">
              <div class="p text-center py-1">{{ item[0] }}</div>
            </router-link>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <h2 class="px-3 pt-3">东师校历</h2>
          <hr>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseCarousel from '@/components/BaseCarousel.vue';

@Component({ components: { BaseCarousel } })
export default class Main extends Vue {
  private carouselData = {
    myId: 'Main',
    content: [
      {
        heading: 'NENUYouth',
        subhead: '东师微信小程序已上线',
        enSubhead: 'Wechat Miniprogram is released！',
        alt: '东师微信小程序已上线',
        src: '/img/main/main0.jpg',
        url: 'https://mp.weixin.qq.com/s/w_CbkYVuTcByXCxEnlJ63w',
        desc: '点击查看图文详情',
        black: true
      },
      {
        heading: '我是东师',
        subhead: '未来，请多指教',
        enSubhead: 'New Experience, New Us!',
        alt: '未来，请多指教',
        src: '/img/main/main1.jpg',
        url: 'https://mp.weixin.qq.com/s/yv66H-tCPyrHuSEc1cOK5Q',
        desc: '点击查看图文详情'
      },
      {
        heading: '东师姑娘',
        subhead: '这里有一首歌唱给你听',
        enSubhead: 'We prepare a song for you, girls.',
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
}
</script>
<style scoped>
.guideListButton {
  color: #212529;
  background-color: #f8f9fa;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  border: 1px solid #dee2e6;
}
</style>
