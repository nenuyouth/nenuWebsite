<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 基础页面显示
 * @Date: 2019-02-24 22:21:25
 * @LastEditTime: 2019-08-25 19:35:12
-->
<template>
  <div class="container page">
    <component :is="item.tag" :key="item.id" v-bind="item" v-for="item in myData" />
  </div>
</template>
<script lang="ts">
import { createComponent, computed } from '@vue/composition-api';
import BaseHead from '#/BaseHead.vue';
import BaseTitle from '#/BaseTitle.vue';
import BaseP from '#/BaseP.vue';
import BaseImg from '#/BaseImg.vue';
import BaseList from '#/BaseList.vue';
import BaseCarousel from '#/BaseCarousel.vue';
import BasePhone from '#/BasePhone.vue';
import BaseFoot from '#/BaseFoot.vue';

export default createComponent({
  name: 'BasePage',
  props: {
    // Page data
    pagedata: {
      type: String,
      required: true,
      default: '[{"tag":"error"}]'
    }
  },
  components: {
    BaseHead,
    BaseTitle,
    BaseP,
    BaseImg,
    BaseList,
    BaseCarousel,
    BasePhone,
    BaseFoot
  },
  setup(props, context) {

    // Handle Data to change tags
    const myData = computed(() => {
      const pageData = JSON.parse(props.pagedata as unknown as string);
      const imageList: string[] = [];

      pageData.forEach((element: any, index: number) => {
        element.myId = index;
        element.tag = `base-${element.tag}`;
        if ('src' in element) imageList.push(element.src);
      });

      context.root.$store.commit('imageList', imageList);

      return pageData;
    });

    return { myData };
  }
});
</script>
<style scoped>
.page {
  color: #000;
}
</style>
