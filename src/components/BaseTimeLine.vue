<template>
  <a-timeline mode="alternate">
    <a-timeline-item :color="item.color" :key="item.text" v-for="(item,index) in timeList">
      <router-link :to="item.url" v-if="item.url">
        <h3 :style="item.headingStyle" v-if="item.title">{{ item.title }}</h3>
        <p v-html="list[index]"/>
      </router-link>
      <template v-else>
        <h3 :style="item.headingStyle" v-if="item.title">{{ item.title }}</h3>
        <p v-html="list[index]"/>
      </template>
    </a-timeline-item>
  </a-timeline>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface TimeList {
  title?: string;
  style?: string | object;
  text: string;
  url?: string;
  type?: string;
  icon?: boolean;
}

@Component
export default class BaseTimeLine extends Vue {
  @Prop(Number) private myId!: number;

  @Prop({ required: true, type: Array })
  private timeList!: TimeList[];

  private get list() {
    const list: string[] = [];

    this.timeList.forEach((element, index) => {
      list[index] = element.text.replace(/\n/gu, '<br/>').replace(/\s/gu, '&ensp;');
    });

    return list;
  }
}
</script>
<style>
</style>
