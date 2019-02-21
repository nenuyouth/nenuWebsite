<template>
  <div style="width:100%;min-height:100%;">
    <base-nav></base-nav>
    <div class="container">
      <template v-for="item in data">
        <component :is="item.tag" :key="item.id" v-bind="item"></component>
      </template>
    </div>
    <base-footer></base-footer>
  </div>
</template>
<script lang="ts">
import BaseNav from "@/components/BaseNav.vue";
import BaseHead from "@/components/BaseHead.vue";
import BaseH3 from "@/components/BaseH3.vue";
import BaseP from "@/components/BaseP.vue";
import BaseImg from "@/components/BaseImg.vue";
import BaseList from "@/components/BaseList.vue";
import BaseCarousel from "@/components/BaseCarousel.vue";
import BasePhone from "@/components/BasePhone.vue";
import BaseFoot from "@/components/BaseFoot.vue";
import BaseFooter from "@/components/BaseFooter.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    BaseNav,
    BaseHead,
    BaseH3,
    BaseP,
    BaseImg,
    BaseList,
    BaseCarousel,
    BasePhone,
    BaseFoot,
    BaseFooter
  }
})
export default class MyPage extends Vue {
  @Prop({ type: String, required: true })
  private mydata!: string;

  private pagedata = [];

  private update() {
    const pagedata = JSON.parse(this.mydata).slice(0);
    pagedata.forEach((element: any, index: number) => {
      element.id = index;
      element.tag = `base-${element.tag}`;
    });

    return pagedata;
  }

  private created() {
    return this.update();
  }

  private beforeUpdate() {
    return this.update();
  }
}
</script>
