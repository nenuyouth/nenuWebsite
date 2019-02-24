<template>
  <div id="body">
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
    <div class="container">
      <div class="row">
        <h2 class="px-3 pt-3">东师指南</h2>
        <hr>
        <div class="w-100"></div>
        <router-link
          :key="item[1]"
          :to="`/guide/${item[1]}`"
          class="col-3 col-md-2 col-lg-1 guideListButton"
          v-for="item in guidelist"
        >
          <img :src="require(`@/icon/guide/${item[1]}.svg`)" class="img-fluid px-2 py-1">
          <div class="p text-center pb-2">{{ item[0] }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Guide extends Vue {
  private readonly guidelist = [
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
  color: #212529;
  background-color: #f8f9fa;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border: 1px solid #dee2e6;
}
</style>
