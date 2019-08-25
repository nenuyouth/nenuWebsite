<template>
  <div class="container">
    <h2 class="px-3 pt-3 text-left">充值入口</h2>
    <hr class="mx-3" />
    <a-row justify="center" type="flex">
      <a-col :lg="6" :xs="12">
        <a-button @click="navigate" block type="primary">充值入口</a-button>
      </a-col>
    </a-row>

    <h2 class="px-3 pt-3">注意事项</h2>
    <hr class="mx-3" />

    <p class="px-3">
      <span style="font-size: 20px;font-weight: bold;">1.</span>
      使用线上网费充值功能前，需在圈存机（自助终端机）处将交行银行卡与校园卡绑定，并开启银校转账功能，否则无法正常使用该功能。
    </p>
    <p class="px-3">
      <span style="font-size: 20px;font-weight: bold;">2.</span>
      当“充值入口”无法使用时，请关注“东北师范大学”微信企业号点击校园卡栏目进行充值。
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NetCharge extends Vue {
  private navigate() {
    window.open('http://mid.nenu.edu.cn:8080/xxhbwx/apps/weixin_payfee/');
  }
}
</script>
