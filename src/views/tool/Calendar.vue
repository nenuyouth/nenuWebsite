<template>
  <div class="container">
    <h1>东北师大校历</h1>
    <hr>
    <base-time-line :time-list="timeList"/>
    <!-- <base-time-axis :time-list="timeList"></base-time-axis> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseTimeLine from '@/components/BaseTimeLine.vue';
// import BaseTimeAxis from '@/components/BaseTimeAxis.vue';

@Component({ components: { BaseTimeLine } })
export default class Calendar extends Vue {
  private readonly timeList = require('@/assets/calendar/calendar');
}
</script>
