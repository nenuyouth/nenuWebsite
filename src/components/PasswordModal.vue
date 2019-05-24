<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 密码验证
 * @Date: 2019-03-16 13:44:32
 * @LastEditTime: 2019-05-24 21:38:23
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
    <a-form :form="form" @submit="validate">
      <!-- 判断是否显示用户名 -->
      <a-form-item
        :labelCol="{ span: 4 }"
        :wrapperCol="{ span: 20 }"
        label="用户名"
        v-if="userNameKey"
      >
        <a-input
          :autocomplete="userNameKey"
          placeholder="请输入用户名"
          v-decorator="[
            'userName',
            {
              rules: [{ required: true, type: 'string' }]
            }
          ]"
        >
          <!-- 用户名图标 -->
          <template #prefix>
            <icon-font type="icon-user"/>
          </template>
        </a-input>
      </a-form-item>

      <!-- 密码 -->
      <a-form-item :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" label="密码">
        <a-input
          :autocomplete="`${passwordKey}password`"
          :type="passwordDisplay?'text':'password'"
          @pressEnter="validate"
          placeholder="请输入密码"
          v-decorator="[
            'password',
            {
              rules: [{ required: true }]
            }
          ]"
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
      </a-form-item>
    </a-form>
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
  @Prop({ type: String, required: true }) private readonly url!: string;

  // 用户的autocomplete Key值
  @Prop({ type: String, default: '' }) private readonly userNameKey!: string;

  // 密码的autocomplete Key值
  @Prop({ type: String, default: 'password' }) private readonly passwordKey!: string;

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
