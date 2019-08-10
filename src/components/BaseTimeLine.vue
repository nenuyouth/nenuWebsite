<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 时间轴插件
 * @Date: 2019-03-23 18:29:52
 * @LastEditTime: 2019-08-10 14:26:15
-->
<template>
  <a-timeline :mode="mode">
    <a-timeline-item :color="item.color" :key="item.text" v-for="(item,index) in timeList">
      <template #dot v-if="item.type">
        <icon-font
          :style="`color:${item.color}`"
          :type="type"
          style="font-size:16px;"
          v-if="item.type.slice(0,5)==='icon-'"
        />
        <a-icon :style="`color:${item.color}`" :type="item.type" style="font-size:16px;" />
      </template>
      <router-link :to="item.url" class="timeLineButton" v-if="item.url">
        <h3 :style="item.headingStyle" v-if="item.title" v-text="item.title" />
        <p v-html="list[index]" />
      </router-link>
      <template v-else>
        <h3 :style="item.headingStyle" v-if="item.title" v-text="item.title" />
        <p v-html="list[index]" />
      </template>
    </a-timeline-item>
  </a-timeline>
</template>
<script lang="ts">
import { createComponent, computed } from 'vue-function-api';

export interface TimeListItem {
  title?: string;
  style?: string | object;
  text: string;
  url?: string;
  type?: string;
  icon?: boolean;
}

const BaseTimeLine = createComponent({
  props: {
    // Component ID
    myId: Number,
    // timelist to display
    timeList: { required: true, type: Array } // TimeListItem[];
  },
  setup(props, context) {
    const list = computed(() => {
      const text: string[] = [];

      (props.timeList as unknown as TimeListItem[]).forEach((element, index) => {
        text[index] = element.text.replace(/\n/gu, '<br/>').replace(/\s/gu, '&ensp;');
      });

      return text;
    });

    // change display mode according to screen width
    const mode = computed(() => context.root.$store.state.screen.sm ? 'alternate' : 'left');

    return { list, mode };
  }
});

export default BaseTimeLine;
</script>
<style>
.timeLineButton {
  color: rgba(0, 0, 0, 0.65);
}
</style>
