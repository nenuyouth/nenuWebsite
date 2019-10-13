<!--
 * @Author: Mr.Hope
 * @Date: 2019-06-26 20:26:14
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-25 21:14:40
 * @Description: 电话组件
-->
<template>
  <div :id="myId" class="phoneCtn">
    <Phone class="phoneIcon" />
    <div class="phoneNum" v-text="num" />
  </div>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api';
import Phone from '|/icon/phone.svg';

const BasePhone = createComponent({
  props: {
    // Component ID
    myId: Number,
    // Telephone Number
    num: { type: [String, Number], required: true }
  },
  components: { Phone }
});

export default BasePhone;
</script>
<style scoped>
.phoneCtn {
  display: -webkit-flex;
  display: flex;
  align-items: center;
  padding: 0 15px;
  line-height: 2.5;
  background-color: #fefefe;
  max-width: 600px;
  margin: 0 auto;
}

.phoneIcon {
  width: 24px;
  height: 24px;
  margin-right: 15px;
}

.phoneNum {
  font-size: 20px;
  font-weight: 400;
  flex: 1 1 auto;
  text-align: left;
}

.nm .phoneCtn {
  background-color: #10110b !important;
  color: #fff !important;
}
</style>
