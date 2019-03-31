<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 时间轴插件
 * @Date: 2019-03-23 18:29:52
 * @LastEditTime: 2019-03-29 12:41:17
-->
<template>
  <a-timeline :mode="mode">
    <a-timeline-item :color="item.color" :key="item.text" v-for="(item,index) in timeList">
      <template v-if="item.type" v-slot:dot>
        <icon-font
          :style="`color:${item.color}`"
          :type="type"
          style="font-size:16px;"
          v-if="item.type.slice(0,5)==='icon-'"
        />
        <a-icon :style="`color:${item.color}`" :type="item.type" style="font-size:16px;"/>
      </template>
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

  private get mode() {
    return this.$store.state.screen.sm ? 'alternate' : 'left';
  }
}
</script>
<style>
</style>
