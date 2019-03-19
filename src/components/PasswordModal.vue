<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 密码验证
 * @Date: 2019-03-16 13:44:32
 * @LastEditTime: 2019-03-19 00:28:22
 -->
<template>
  <!-- 密码输入框 -->
  <a-modal
    :closable="false"
    :destroyOnClose="true"
    :keyboard="false"
    :maskClosable="false"
    :visible="modalDisplay"
    title="身份验证"
  >
    <form>
      <p>请输入密码：</p>
      <a-input
        :type="passwordDisplay?'text':'password'"
        @pressEnter="validatePassword"
        autocomplete="internalPassword"
        v-model="password"
      >
        <!-- 密码图标 -->
        <div slot="prefix">
          <svg class="icon" viewBox="0 0 1024 1024">
            <path
              d="M807.049 391.258c0.946-9.62 1.45-19.37 1.45-29.239 0-163.7-132.706-296.406-296.406-296.406S215.687
            198.318 215.687 362.02c0 9.802 0.498 19.486 1.432 29.043-43.925 18.95-74.675 62.638-74.675
            113.516v330.363c0 68.25 55.328 123.58 123.58 123.58h491.672c68.25 0 123.578-55.328
            123.578-123.58V504.578c0-50.704-30.54-94.267-74.225-113.32zM510.917 165.905c109.134 0 197.604 88.47
            197.604 197.603 0 5.895-0.275 11.726-0.782 17.49H314.094a200.097 200.097 0 0 1-0.782-17.49c0.002-109.132
            88.472-197.603 197.605-197.603z"
              fill="#8a8a8a"
            ></path>
          </svg>
        </div>

        <!-- 控制密码显隐图标 -->
        <div @click="passwordDisplay=!passwordDisplay" class="togglePassword" slot="suffix">
          <svg class="icon" viewBox="0 0 1024 1024">
            <path
              d="M511.8 399.4c62.5 0 113.2 50.6 113.2 113 0 62.5-50.7 113.1-113.2 113.1-62.6
          0-113.2-50.6-113.2-113.1-0.1-62.4 50.6-113 113.2-113z m0 321.1c115 0 208.3-93.2 208.3-208
          0-114.9-93.3-208-208.3-208-115.1 0-208.4 93.2-208.4 208s93.3 208 208.4 208z m500.3-247.2c7.6 11.1 11.9
          24.7 11.9 39.1 0 11.7-2.8 22.7-8 32.5-3 4.7-6.2 9.3-9.5 13.8C902.9 705 735.8 803.2 545.3 813.6c-11.1
          0.6-22.3 0.9-33.6 0.9s-22.5-0.3-33.6-0.9C286 803.1 117.6 703.1 14.2 554.7c-1.1-1.6-2.3-3.3-3.5-4.9C3.9
          538.9 0 526.1 0 512.5c0-14.5 4.4-28 11.9-39.1l-0.3-0.3c107.5-156.9 287.2-260.5 491.3-263.4 3-0.1 6-0.2
          8.9-0.2 3 0 6 0.1 8.9 0.2 204.2 2.8 383.9 106.6 491.4 263.6z"
              v-if="passwordDisplay"
            ></path>
            <path
              d="M941.677 391.71c9.338-14.006 6.225-32.681-6.225-43.575-14.006-10.894-32.681-7.781-43.575 6.225-1.557
          1.556-174.3 205.426-379.728 205.426-199.2
          0-379.727-205.426-381.283-206.982-10.895-12.45-31.125-14.006-43.576-3.113-12.45 10.894-14.006
          31.125-3.113 43.576 3.113 4.668 40.463 46.687 99.6 93.375l-79.37 82.482c-12.45 12.45-10.893 32.681 1.557
          43.575 3.113 6.225 10.894 9.338 18.676 9.338 7.78 0 15.562-3.113 21.787-9.338l85.594-88.706c40.463 28.013
          88.707 54.47 141.62 73.144l-32.682 110.495c-4.668 17.118 4.67 34.237 21.788 38.906h9.337c14.006 0
          26.457-9.338 29.569-23.344l32.681-110.495c24.9 4.669 51.357 7.782 77.813 7.782s52.913-3.113 77.814-7.782l32.68
          108.939c3.114 14.006 17.12 23.343 29.57 23.343 3.113 0 6.225 0 7.782-1.556 17.118-4.67 26.456-21.787
          21.788-38.906L649.099 595.58c52.914-18.676 101.157-45.132 141.62-73.144l84.038 87.15c6.225 6.225 14.006
          9.338 21.787 9.338 7.781 0 15.563-3.113 21.787-9.337 12.45-12.451 12.45-31.125
          1.557-43.576l-79.37-82.481c63.808-46.689 101.16-91.82 101.16-91.82z"
              v-else
            ></path>
          </svg>
        </div>
      </a-input>
    </form>
    <!-- 自定义对话框按钮 -->
    <template slot="footer">
      <a-button :loading="validating" @click="validatePassword" key="submit" type="primary">确定</a-button>
    </template>
  </a-modal>
</template>
<script lang="ts">
import axios from 'axios';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class PasswordModal extends Vue {
  // 对话框显隐
  private modalDisplay = true;

  // 密码显隐
  private passwordDisplay = false;

  // 密码
  private password = '';

  // 按钮加载状态控制
  private validating = false;

  // 验证密码
  private async validatePassword() {
    if (this.password) {
      // 显示登录状态
      this.$message.loading('登陆中..', 0);
      this.validating = true;

      await axios.get(`/server/passwordValidate.php?password=${this.password}`).then(response => {
        this.$message.destroy();
        if (response.data === 'correct') {
          // 验证成狗
          this.modalDisplay = false; // 隐藏弹窗
          this.$store.commit('internalLogin'); // 改变internalLogin state
          this.$store.commit('internalPassword', this.password); // 改变internalPassword state
          this.$emit('login'); // 触发login事件
        } else {
          this.password = ''; // 清空密码
          this.$message.error('密码错误'); // 提示密码错误
        }

        this.validating = false; // 取消加载状态
      });
    } else this.$message.warning('请输入密码');
  }

  private mounted() {
    // 检查登录状态
    if (this.$store.state.internalLogin === true) {
      // 已经登录，取消弹窗并触发login事件
      this.modalDisplay = false;
      this.$emit('login');
    }
  }
}
</script>
<style>
.togglePassword {
  width: 22px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
