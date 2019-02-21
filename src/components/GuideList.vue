<template>
  <div>
    <h2 class="px-3 pt-3">东师指南</h2>
    <hr>
    <div class="row">
      <div class="w-100"></div>
      <router-link
        :key="item[1]"
        :to="`/guide/${item[1]}`"
        class="col-3 col-md-2 guideListButton"
        v-for="item in guidelist"
      >
        <img :src="require(`@/icon/guide/${item[1]}.svg`)" class="img-fluid px-2 py-1">
        <div class="p text-center py-1">{{ item[0] }}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
/*
 * import Vue from "vue";
 * import Component from "vue-class-component";
 */

/*
 * @Component({})
 * export default class GuideList extends Vue {
 */
export default {
  data: () => ({
    guidelist: [
      ["报到", "check"],
      ["寝室", "dorm"],
      ["生活", "life"],
      ["食堂", "dining"],
      ["校园卡", "card"],
      ["校园网", "network"],
      ["学习", "study"],
      ["附近", "nearby"],
      ["学生组织", "studentOrg"],
      ["社团", "corporation"],
      ["资助", "subsidize"],
      ["交通", "traffic"]
    ]
  })
};
</script>
<style>
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
  margin-bottom: 0;
}
</style>
