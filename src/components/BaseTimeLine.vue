<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 时间轴插件
 * @Date: 2019-03-23 18:29:52
 * @LastEditTime: 2019-11-07 16:43:30
-->
<template>
  <a-timeline :mode="mode">
    <a-timeline-item v-for="(item,index) in timeList" :key="item.text" :color="item.color">
      <template v-if="item.type" #dot>
        <icon-font
          v-if="item.type.slice(0,5)==='icon-'"
          :style="`color:${item.color}`"
          :type="type"
          style="font-size:16px;"
        />
        <a-icon :style="`color:${item.color}`" :type="item.type" style="font-size:16px;" />
      </template>
      <router-link v-if="item.url" :to="item.url" class="timeLineButton">
        <h3 v-if="item.title" :style="item.headingStyle" v-text="item.title" />
        <p v-html="list[index]" />
      </router-link>
      <template v-else>
        <h3 v-if="item.title" :style="item.headingStyle" v-text="item.title" />
        <p v-html="list[index]" />
      </template>
    </a-timeline-item>
  </a-timeline>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export interface TimeListItem {
  title?: string;
  style?: string | object;
  text: string;
  url?: string;
  type?: string;
  icon?: boolean;
}

@Component
export default class BaseTimeLine extends Vue {
  @Prop(Number) private readonly myId!: number;

  // timelist to display
  @Prop({ required: true, type: Array })
  private readonly timeList!: TimeListItem[];

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
<style lang="stylus">
.timeLineButton
  color rgba(0, 0, 0, 0.65)
</style>
