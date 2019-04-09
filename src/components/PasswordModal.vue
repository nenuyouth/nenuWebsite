<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 密码验证
 * @Date: 2019-03-16 13:44:32
 * @LastEditTime: 2019-04-09 19:31:47
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
      <!-- 判断是否显示用户名 -->
      <template v-if="userNameKey">
        <p>用户名：</p>
        <a-input :autocomplete="userNameKey" placeholder="请输入用户名" type="text" v-model="userName">
          <!-- 用户名图标 -->
          <template #prefix>
            <icon-font type="icon-user"/>
          </template>
        </a-input>
      </template>

      <p>密码：</p>
      <a-input
        :autocomplete="passwordKey"
        :type="passwordDisplay?'text':'password'"
        @pressEnter="validatePassword"
        placeholder="请输入密码"
        v-model="password"
      >
        <!-- 密码图标 -->
        <template #prefix>
          <icon-font type="icon-password"/>
        </template>

        <!-- 控制密码显隐图标 -->
        <template #suffix>
          <div @click="passwordDisplay=!passwordDisplay" class="togglePassword">
            <icon-font type="icon-eye" v-if="passwordDisplay"/>
            <icon-font type="icon-eyeClose" v-else/>
          </div>
        </template>
      </a-input>
    </form>
    <!-- 自定义对话框按钮 -->
    <template #footer>
      <a-button :loading="validating" @click="validatePassword" key="submit" type="primary">确定</a-button>
    </template>
  </a-modal>
</template>
<script lang="ts">
import axios from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PasswordModal extends Vue {
  // 验证地址
  @Prop({ type: String, required: true }) private url!: string;

  // 用户的autocomplete Key值
  @Prop({ type: String, default: '' }) private userNameKey!: string;

  // 密码的autocomplete Key值
  @Prop({ type: String, default: 'password' }) private passwordKey!: string;

  // 对话框显隐
  private modalDisplay = true;

  // 密码显隐
  private passwordDisplay = false;

  // 用户名
  private userName = '';

  // 密码
  private password = '';

  // 按钮加载状态控制
  private validating = false;

  // 验证密码
  private async validatePassword() {
    // const query = this.userNameKey ? `&userName=${this.userName}` : '';

    if (this.password) {
      // 显示登录状态
      this.$message.loading('登陆中..', 0);
      this.validating = true;
      await axios.post(`${this.url}.php`, { password: this.password, userName: this.userName }).then(response => {
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
