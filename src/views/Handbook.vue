<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 东师指南页面
 * @Date: 2019-03-24 11:14:13
 * @LastEditTime: 2019-04-01 17:12:25
 -->
<template>
  <div class="container">
    <div class="jumbotron text-left">
      <h1>青春遇见梦想</h1>
      <h1>&nbsp;&nbsp;而我刚好在场</h1>
      <p class="lead">东北师范大学校学生会</p>
      <hr class="my-4">
      <p>人格的典范，学习的楷模</p>
      <p class="lead">
        <a class="btn btn-primary btn-lg" href="#" role="button">了解校学生会</a>
      </p>
    </div>
    <h2 class="px-3 pt-3">东师指南</h2>
    <hr>
    <a-row>
      <a-col
        :key="item[1]"
        :lg="2"
        :md="4"
        :xs="6"
        class="guideListButton"
        v-for="item in guidelist"
      >
        <router-link :to="`/handbook/${item[1]}`">
          <div>
            <img :src="`/img/icon/guide/${item[1]}.svg`" class="guideIcon px-2 py-1">
            <div class="guideButtonDesc">{{ item[0] }}</div>
          </div>
        </router-link>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Guide extends Vue {
  private guidelist = [
    ['报到', 'check'],
    ['寝室', 'dorm'],
    ['生活', 'life'],
    ['食堂', 'dining'],
    ['校园卡', 'card'],
    ['校园网', 'network'],
    ['学习', 'study'],
    ['附近', 'nearby'],
    ['学生组织', 'studentOrg'],
    ['社团', 'corporation'],
    ['资助', 'subsidize'],
    ['交通', 'traffic']
  ];
}
</script>
<style scoped>
.guideListButton {
  padding: 0.375rem 0.75rem;
  border: 1px solid #dee2e6;
  vertical-align: middle;
  background-color: #fff;
  text-align: center;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
}

.guideListButton:hover {
  background-color: #f8f8f8;
}

.guideIcon {
  max-width: 100%;
}

.guideButtonDesc {
  text-align: center;
  color: #212529;
  padding: 0.25em 0;
}
</style>
