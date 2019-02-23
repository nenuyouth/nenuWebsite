<template>
  <div class="container">
    <h1>东北师大校历</h1>
    <hr>
    <base-time-axis :time-list="timeList"></base-time-axis>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseTimeAxis from "@/components/BaseTimeAxis.vue";

@Component({components: { BaseTimeAxis }})
export default class Calendar extends Vue {
  private timeList = [
    {
      title: "1946年",
      text: "东北师范大学建校"
    },
    {
      title: "2018年春季学期",
      text: "2018年3月15日(正月十八)——2018年7月20日(共20周)"
    },
    {
      title: "2018年暑假",
      text: "2018年7月21日-2018年9月2日(共6周)"
    },
    {
      title: "2018年秋季学期",
      text: "2018年9月3日-2019年1月18日(共20周)\n  (2月5日为春节，距春节17天)"
    },
    {
      title: "2019年寒假",
      text: "2019年1月19日-2019年3月3日(共6周)"
    },
    {
      title: "2019年春季学期",
      text: "2019年3月4日(正月二十八)——2019年7月12日(共19周)"
    },
    {
      title: "2019年暑假",
      text: "2019年7月13日-2019年8月25日(共6周)"
    },
    {
      title: "2019年秋季学期",
      text: "2019年8月26日-2020年1月10日(共20周)\n  (1月25日为春节，距春节15天)"
    },
    {
      title: "2020年寒假",
      text: "2019年1月11日-2020年2月23日(共6周)"
    },
    {
      title: "2020年春季学期",
      text: "2020年2月24日(二月初二)——2020年7月17日(共21周)"
    },
    {
      title: "2020年暑假",
      text: "2020年7月18日-2020年8月30日(共6周)"
    },
    {
      title: "2020年秋季学期",
      text: "2019年8月31日-2021年1月22日(共21周)\n  (2月12日为春节，距春节20天)"
    },
    {
      title: "2021年寒假",
      text: "2021年1月23日-2021年3月8日(共6周)"
    }
  ];
}
</script>
