<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 东师指南页面
 * @Date: 2019-03-24 11:14:13
 * @LastEditTime: 2019-11-07 16:11:23
-->
<template>
  <div class="container">
    <h2 class="px-3 pt-3">讲座信息</h2>
    <hr />
    <a-menu v-model="current" mode="horizontal" @click="menuHandler">
      <a-menu-item v-for="item in schools" :key="item[0]" v-text="item[1]" />
    </a-menu>
    <a-skeleton
      v-if="lectureList.length === 0"
      :paragraph="{
        rows: 10,
        width: [
          '50%',
          '80%',
          '60%',
          '80%',
          '60%',
          '40%',
          '80%',
          '60%',
          '80%',
          '30%',
        ],
      }"
      active
      title="50%"
    />
    <LectureList v-else :list="lectureList" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import LectureList from "@/components/LectureList.vue";
import { Route } from "vue-router";
import axios from "axios";

interface MenuEvent {
  domEvent: MouseEvent;
  item: Vue.Component;
  key: string;
  keyPath: string[];
}

@Component({ components: { LectureList } })
export default class Lecture extends Vue {
  private current = ["psy"];

  private lectureList = [];

  private readonly schools = [
    ["psy", "心理学院"],
    ["edu", "教育学部"],
    ["math", "数学学院"],
  ];

  private created() {
    const { school } = this.$route.params;

    if (school) {
      this.current = [school];
      axios.get(`/server/lecture/${school}.php`).then((res) => {
        this.lectureList = res.data;
      });
    }
  }

  private menuHandler(event: MenuEvent) {
    this.$router.push(`/lecture/${event.key}`);
  }

  @Watch("$route")
  private onRouteChange(route: Route) {
    const paths = route.fullPath.split("/");

    if (paths[1] === "lecture") {
      this.current = [paths[2]];
      axios.get(`/server/lecture/${paths[2]}.php`).then((res) => {
        this.lectureList = res.data;
      });
    }
  }
}
</script>
