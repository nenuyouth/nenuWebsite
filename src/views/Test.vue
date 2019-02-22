<template>
  <div class="container">
    <a href="/doc">内部文档</a>
    <base-head title="张伯望"></base-head>
    <base-list
      :content="[
        { text: 'aa', icon: '/img/icon/backTop.svg' },
        {
          text: 'abcde',
          desc: 'jjjjj',
          url: 'asbc',
          icon: '/img/icon/backTop.svg'
        },
        { text: 'aabcde', desc: 'jjjjj', url: 'abc' },
        { text: 'aaabcde', desc: 'jjjjj', url: 'abac' }
      ]"
      foot="张伯望经"
      head="a张伯望"
    ></base-list>
    <base-h3 text="张伯望最帅"></base-h3>
    <base-p head="什么是张伯望" text="张伯望最帅aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"></base-p>
    <base-img desc="东师青年" src="/img/icon/nenuyouth.png"></base-img>
    <base-phone num="123456789"></base-phone>
    <div class="row justify-content-center">
      <div class="col-12 col-lg-9">
        <base-carousel
          :content="[
            {
              heading: '张伯望',
              src: '/img/icon/nenuyouth.png',
              href: 'https://mrhope.top',
              black: true,
              subhead: '张伯望最帅',
              clickDesc: '666666',
              enSubhead: 'Zhang is handsome'
            },
            {
              heading: '张伯望2',
              src: '/img/icon/nenuyouth.png',
              href: 'https://mrhope.top'
            }
          ]"
        ></base-carousel>
      </div>
    </div>
    <base-foot></base-foot>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseCarousel from "@/components/BaseCarousel.vue";
import BaseH3 from "@/components/BaseH3.vue";
import BaseP from "@/components/BaseP.vue";
import BaseImg from "@/components/BaseImg.vue";
import BaseList from "@/components/BaseList.vue";
import BasePhone from "@/components/BasePhone.vue";
import BaseHead from "@/components/BaseHead.vue";
import BaseFoot from "@/components/BaseFoot.vue";

@Component({
  components: {
    BaseCarousel,
    BaseH3,
    BaseP,
    BaseImg,
    BaseList,
    BasePhone,
    BaseHead,
    BaseFoot
  }
})
export default class Test extends Vue {}
</script>
<style></style>
