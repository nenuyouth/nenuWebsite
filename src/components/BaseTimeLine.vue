<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 时间轴插件
 * @Date: 2019-03-23 18:29:52
 * @LastEditTime: 2019-04-01 12:48:25
-->
<template>
  <a-timeline :mode="mode">
    <a-timeline-item :color="item.color" :key="item.text" v-for="(item,index) in timeList">
      <template v-if="item.type" #dot>
        <icon-font
          :style="`color:${item.color}`"
          :type="type"
          style="font-size:16px;"
          v-if="item.type.slice(0,5)==='icon-'"
        />
        <a-icon :style="`color:${item.color}`" :type="item.type" style="font-size:16px;"/>
      </template>
      <router-link :to="item.url" class="timeLineButton" v-if="item.url">
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

  // timelist to display
  @Prop({ required: true, type: Array })
  private timeList!: TimeList[];

  // handle list text
  private get list() {
    const list: string[] = [];

    this.timeList.forEach((element, index) => {
      list[index] = element.text.replace(/\n/gu, '<br/>').replace(/\s/gu, '&ensp;');
    });

    return list;
  }

  // change display mode according to screen width
  private get mode() {
    return this.$store.state.screen.sm ? 'alternate' : 'left';
  }
}
</script>
<style>
.timeLineButton {
  color: rgba(0, 0, 0, 0.65);
}
</style>
