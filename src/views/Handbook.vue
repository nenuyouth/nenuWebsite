<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 东师指南页面
 * @Date: 2019-03-24 11:14:13
 * @LastEditTime: 2019-05-02 22:08:04
-->
<template>
  <div class="container">
    <h2 class="px-5 pt-3">东师指南</h2>
    <BaseGrid :content="guidelist"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseGrid from '@/components/BaseGrid.vue';

@Component({ components: { BaseGrid } })
export default class Guide extends Vue {
  private guidelist = [
    { text: '学习', icon: '/img/icon/tabPage/study.svg', url: '/handbook/study' },
    { text: '食堂', icon: '/img/icon/tabPage/dining.svg', url: '/handbook/dining' },
    { text: '生活', icon: '/img/icon/tabPage/life.svg', url: '/handbook/life' },
    { text: '寝室', icon: '/img/icon/tabPage/dorm.svg', url: '/handbook/dorm' },
    { text: '校园网', icon: '/img/icon/tabPage/network.svg', url: '/handbook/network' },
    { text: '校园卡', icon: '/img/icon/tabPage/card.svg', url: '/handbook/card' },
    { text: '吃喝玩乐', icon: '/img/icon/tabPage/nearby.svg', url: '/handbook/nearby' },
    { text: '交通', icon: '/img/icon/tabPage/traffic.svg', url: '/handbook/traffic' },
    { text: '学生组织', icon: '/img/icon/tabPage/studentOrg.svg', url: '/handbook/studentOrg' },
    { text: '社团', icon: '/img/icon/tabPage/corporation.svg', url: '/handbook/corporation' },
    { text: '资助', icon: '/img/icon/tabPage/subsidize.svg', url: '/handbook/subsidize' }
  ];
}
</script>
