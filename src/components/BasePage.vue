<template>
  <div class="container">
    <template v-for="item in myData">
      <component :is="item.tag" :key="item.id" v-bind="item"></component>
    </template>
  </div>
</template>
<script lang="ts">
import BaseHead from '@/components/BaseHead.vue';
import BaseH3 from '@/components/BaseH3.vue';
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
    BaseH3,
    BaseP,
    BaseImg,
    BaseList,
    BaseCarousel,
    BasePhone,
    BaseFoot
  }
})
export default class BasePage extends Vue {
  @Prop({ type: Array, required: true, default: [{ tag: 'error' }] })
  private pagedata!: any[];

  get myData() {
    const myData = this.pagedata.slice(0);

    myData.forEach((element: any, index: number) => {
      element.myId = index;
      element.tag = `base-${element.tag}`;
    });

    return myData;
  }
}
</script>
