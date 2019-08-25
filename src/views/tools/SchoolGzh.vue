<template>
  <div class="container">
    <h2 class="px-3 pt-3">学院微信</h2>
    <hr class="mx-3" />
    <div class="row px-3">
      <div
        :key="item.text"
        @click="$navigate(item.url,$router,$route)"
        class="col-4 col-sm-3 col-md-2 col-lg-1 col-fix"
        v-for="item in gzh"
      >
        <img
          :src="require(`|/schoolGzh/${item.src}.jpg`)"
          class="img-thumbnail mt-1 img-fix"
          style="border-radius:50%;"
        />
        <p class="mx-1 my-2 gzhName">{{item.text}}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SchoolGzh extends Vue {
  private readonly gzh = require('|/schoolGzh/schoolGzh');
}
</script>
<style scoped>
.col-fix {
  padding: 0 5px;
}
.img-fix {
  width: 90%;
  margin: 0.25rem 5% 0 5%;
}
.gzhName {
  text-align: center;
  color: #000;
  font-size: 14px;
}
</style>
