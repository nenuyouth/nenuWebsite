<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 基础页面显示
 * @Date: 2019-02-24 22:21:25
 * @LastEditTime: 2019-05-12 21:24:14
-->
<template>
  <div class="container page">
    <component :is="item.tag" :key="item.id" v-bind="item" v-for="item in myData"/>
  </div>
</template>
<script lang="ts">
import BaseHead from '#/BaseHead.vue';
import BaseTitle from '#/BaseTitle.vue';
import BaseP from '#/BaseP.vue';
import BaseImg from '#/BaseImg.vue';
import BaseList from '#/BaseList.vue';
import BaseCarousel from '#/BaseCarousel.vue';
import BasePhone from '#/BasePhone.vue';
import BaseFoot from '#/BaseFoot.vue';

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
