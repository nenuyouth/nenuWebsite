<template>
  <div class="containerx">
    <div>你好，这里{{condition?'校学生会':'张伯望'}}</div>
    <button @click="changeName">改变名字</button>
    <div>Message from son:{{msg}}</div>
    <button @click="callSon">传消息</button>
    <base-carousel :content="carouselData.content" :myId="carouselData.nyId"></base-carousel>
    <message :msg="msgToSon" @callFather="callFromSon"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Message from '#/Message.vue';
import BaseCarousel from '#/BaseCarousel.vue';

@Component({ components: { BaseCarousel, Message } })
export default class Cooperation extends Vue {

  private msg = '';

  private msgToSon = '';

  private condition = true;

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

  private callSon() {
    this.msgToSon = '张伯望的小媳妇真美';
  }

  private changeName() {
    this.condition = !this.condition;
  }

  private callFromSon(msgFromSon: any) {
    this.msg = msgFromSon;
  }
}
</script>
