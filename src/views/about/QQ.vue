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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class QQ extends Vue {}
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
}
</style>
