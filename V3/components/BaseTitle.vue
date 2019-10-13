<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 基础标题
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-08-25 21:16:50
-->
<template>
  <div :id="myId" :style="myStyle" class="myH3" v-text="text" />
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api';

interface Style {
  [propName: string]: string;
}

export default createComponent({
  name: 'BaseTitle',
  props: {
    // Component id
    myId: Number,
    // Heading text
    text: { type: String, required: true },
    // Heading Style
    myStyle: [String, Object] // string | Style
  }
});
</script>
<style lang='scss' scoped>
.myH3 {
  width: 100%;
  max-width: 600px;
  text-align: left;
  font-weight: 500;
  padding: 12px 15px 4px 15px;
  min-height: 24px;
  font-size: 22px;
  max-width: 600px;
  margin: 0 auto;
  @media (min-width: 768px) {
    min-height: 26px;
    font-size: 24px;
  }
}

.myH3 + .myH3 {
  padding-top: 2px;
}
</style>
