<template>
  <div class="container">
    <h1>东北师大2019年春季学期校历</h1>
    <hr>
    <base-time-line :time-list="timeList"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseTimeLine from '@/components/BaseTimeLine.vue';

@Component({ components: { BaseTimeLine } })
export default class Calendar extends Vue {
  private readonly timeList = require('@/assets/calendar/2019spring');
}
</script>
