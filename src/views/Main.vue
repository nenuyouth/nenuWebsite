<template>
  <div id="body">
    <div class="jumbotron text-left">
      <h1>青春遇见梦想</h1>
      <h1>&nbsp;&nbsp;而我刚好在场</h1>
      <p class="lead">东北师范大学校学生会</p>
      <hr class="my-4" />
      <p>人格的典范，学习的楷模</p>
      <p class="lead">
        <a class="btn btn-primary btn-lg" href="#" role="button"
          >了解校学生会</a
        >
      </p>
    </div>
    <div class="container">
      <main-carousel></main-carousel>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-6">
          <guide-list></guide-list>
        </div>
        <div class="col-12 col-lg-6">
          <h2 class="px-3 pt-3">东师校历</h2>
          <hr />
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import MainCarousel from "@/components/MainCarousel.vue";
import GuideList from "@/components/GuideList.vue";

@Component({
  components: {
    MainCarousel,
    GuideList
  }
})
export default class Main extends Vue {}
</script>
