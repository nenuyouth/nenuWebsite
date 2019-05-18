<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Base Foot
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-05-18 16:20:21
-->
<template>
  <div :id="myId" class="Footer">
    <div class="footerCtn">
      <div>行遍千山万水，归来仍是东师青年——</div>
      <div class="footLogo rotate">
        <img src="/img/icon/logo.png" style="width:100%;height:100%;">
      </div>
    </div>
    <span v-if="desc">{{ desc }}\n</span>
    <span v-if="author">编辑人：{{ author }}</span>
    <span v-if="time">最后编辑于{{ time }}</span>
    <span v-if="time || author">
      <br>
    </span>Copyright © 2017-2019 HopeStudio
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseFoot extends Vue {
  // Component ID
  @Prop(Number) private readonly myId!: number;

  // Foot description text
  @Prop(String) private readonly desc!: string;

  // Author information
  @Prop({ type: String, default: 'Mr.Hope' }) private readonly author!: string;

  // Last edit time
  @Prop(String) private readonly time!: string;
}
</script>
<style lang='scss' scoped>
.Footer {
  margin-top: 20px;
  padding: 8px 5%;
  font-size: 12px;
  color: #888;
  text-align: center;
}

.footerCtn {
  font: {
    size: 10px;
    weight: 300;
  }
  letter-spacing: 1px;
  line-height: 1.6;
  text-align: center;
  color: #888;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 600px) {
    font-size: 12px;
  }
}

.nm .footerCtn {
  color: #777;
}
.footLogo {
  width: 20px;
  height: 20px;
  margin: 0;
}

@keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.rotate {
  -webkit-animation: 9.5s linear 0s normal none infinite rotate;
  animation: 9.5s linear 0s normal none infinite rotate;
}
</style>
