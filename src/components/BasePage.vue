<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 基础页面显示
 * @Date: 2019-02-24 22:21:25
 * @LastEditTime: 2019-05-02 21:53:51
-->
<template>
  <div class="container page">
    <template v-for="item in myData">
      <component :is="item.tag" :key="item.id" v-bind="item"/>
    </template>
  </div>
</template>
<script lang="ts">
import BaseHead from '@/components/BaseHead.vue';
import BaseTitle from '@/components/BaseTitle.vue';
import BaseP from '@/components/BaseP.vue';
import BaseImg from '@/components/BaseImg.vue';
import BaseList from '@/components/BaseList.vue';
import BaseCarousel from '@/components/BaseCarousel.vue';
import BasePhone from '@/components/BasePhone.vue';
import BaseFoot from '@/components/BaseFoot.vue';

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    BaseHead,
    BaseTitle,
    BaseP,
    BaseImg,
    BaseList,
    BaseCarousel,
    BasePhone,
    BaseFoot
  }
})
export default class BasePage extends Vue {
  // Page data
  @Prop({ type: String, required: true, default: '[{"tag":"error"}]' })
  private readonly pagedata!: string;

  // Handle Data to change tags
  private get myData() {
    const myData = JSON.parse(this.pagedata);
    const imageList: string[] = [];

    myData.forEach((element: any, index: number) => {
      element.myId = index;
      element.tag = `base-${element.tag}`;
      if ('src' in element) imageList.push(element.src);
    });

    this.$store.commit('imageList', imageList);

    return myData;
  }
}
</script>
<style scoped>
.page {
  color: #000;
}
</style>
