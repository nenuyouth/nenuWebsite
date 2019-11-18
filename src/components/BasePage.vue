<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 基础页面显示
 * @Date: 2019-02-24 22:21:25
 * @LastEditTime: 2019-11-07 16:43:06
-->
<template>
  <div class="container page">
    <component :is="item.tag" v-for="item in myData" :key="item.id" v-bind="item" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseCarousel from '#/BaseCarousel.vue';
import BaseFoot from '#/BaseFoot.vue';
import BaseHead from '#/BaseHead.vue';
import BaseImg from '#/BaseImg.vue';
import BaseList from '#/BaseList.vue';
import BaseP from '#/BaseP.vue';
import BasePhone from '#/BasePhone.vue';
import BaseTitle from '#/BaseTitle.vue';

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
    const pageData = JSON.parse(this.pagedata);
    const imageList: string[] = [];

    pageData.forEach((element: any, index: number) => {
      element.myId = index;
      element.tag = `base-${element.tag}`;
      if ('src' in element) imageList.push(element.src);
    });

    this.$store.commit('imageList', imageList);

    return pageData;
  }
}
</script>
<style lang="stylus" scoped>
.page
  color #000
</style>
