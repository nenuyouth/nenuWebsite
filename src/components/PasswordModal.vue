<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 密码验证
 * @Date: 2019-03-16 13:44:32
 * @LastEditTime: 2019-09-02 11:03:17
-->
<template>
  <!-- 密码输入框 -->
  <a-modal
    :closable="false"
    :destroy-on-close="true"
    :keyboard="false"
    :mask-closable="false"
    :visible="modalDisplay"
    title="身份验证"
  >
    <a-form :form="form" @submit="validate">
      <!-- 判断是否显示用户名 -->
      <a-form-item
        v-if="userNameKey"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        label="用户名"
      >
        <a-input
          v-decorator="[
            'userName',
            {
              rules: [{ required: true, type: 'string' }]
            }
          ]"
          :autocomplete="userNameKey"
          placeholder="请输入用户名"
        >
          <!-- 用户名图标 -->
          <template #prefix>
            <user />
          </template>
          <!-- 用户名后缀 -->
          <template #suffix>{{userNameSuffix}}</template>
        </a-input>
      </a-form-item>

      <!-- 密码 -->
      <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" label="密码">
        <a-input
          v-decorator="[
            'password',
            {
              rules: [{ required: true }]
            }
          ]"
          :autocomplete="`${passwordKey}password`"
          :type="passwordDisplay?'text':'password'"
          placeholder="请输入密码"
          @pressEnter="validate"
        >
          <!-- 密码图标 -->
          <template #prefix>
            <password />
          </template>

          <!-- 控制密码显隐图标 -->
          <template #suffix>
            <div class="togglePassword" @click="passwordDisplay=!passwordDisplay">
              <eye v-if="passwordDisplay" />
              <eyeClose v-else />
            </div>
          </template>
        </a-input>
      </a-form-item>
      <slot />
    </a-form>
    <!-- 自定义对话框按钮 -->
    <template #footer>
      <a-button
        key="submit"
        :loading="validating"
        type="primary"
        @click="validatePassword"
        v-text="'确定'"
      />
    </template>
  </a-modal>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import User from '|/icon/user.svg';
import Password from '|/icon/password.svg';
import Eye from '|/icon/eye.svg';
import EyeClose from '|/icon/eyeClose.svg';

@Component({ components: { User, Password, Eye, EyeClose } })
export default class PasswordModal extends Vue {
  // 验证地址
  @Prop({ type: String, required: true }) private readonly url!: string;

  // 用户的autocomplete Key值
  @Prop({ type: String, default: '' }) private readonly userNameKey!: string;

  // 密码的autocomplete Key值
  @Prop({ type: String, default: 'password' }) private readonly passwordKey!: string;

  // 密码的autocomplete Key值
  @Prop({ type: String, default: '' }) private readonly userNameSuffix!: string;

  private form: any;

  // 对话框显隐
  private modalDisplay = true;

  // 密码显隐
  private passwordDisplay = false;

  // 按钮加载状态控制
  private validating = false;

  private validate(e: Event) {
    e.preventDefault(); // 阻止原生事件刷新浏览器
    this.validatePassword();
  }

  // 验证密码
  private validatePassword() {
    this.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        // 显示登录状态
        this.$message.loading('登陆中..', 0);
        this.validating = true;
        await axios.post(`${this.url}.php`, { password: values.password, userName: values.userName })
          .then(response => {
            this.$message.destroy();
            if (response.data === 'correct') {
              // 验证成狗
              this.modalDisplay = false; // 隐藏弹窗
              this.$store.commit('login', this.passwordKey); // 改变internalLogin state
              this.$store.commit('password', [this.passwordKey, values.password]); // 改变internalPassword state
              this.$emit('login'); // 触发login事件
            } else {
              this.form.setFieldsValue({ password: '' });// 清空密码
              this.$message.error('密码错误'); // 提示密码错误
            }

            this.validating = false; // 取消加载状态
          });
      }
    });
  }

  private beforeCreate() {
    this.form = this.$form.createForm(this);
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
