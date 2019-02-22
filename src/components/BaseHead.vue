<template>
  <div>
    <!-- <div v-wechat-title="title"> -->
    <div :id="myId" class="title">{{ title }}</div>
    <hr>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BaseHead extends Vue {
  @Prop(Number) private myId!: number;

  @Prop({ type: String, required: true }) private title!: string;

  private mounted() {
    document.title = this.title;
  }
}
</script>
<style scoped>
.title {
  color: #333;
  font-size: 30px;
  line-height: 35px;
  font-weight: bold;
  overflow: hidden;
  padding: 10px 0;
  max-width: 600px;
  margin: 0 auto;
}
hr {
  max-width: 600px;
  height: 2px;
  margin: 0 auto;
}
</style>
