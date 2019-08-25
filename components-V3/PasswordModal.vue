<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 密码验证
 * @Date: 2019-03-16 13:44:32
 * @LastEditTime: 2019-08-26 00:06:32
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
            <user />
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
            <password />
          </template>

          <!-- 控制密码显隐图标 -->
          <template #suffix>
            <div @click="passwordDisplay=!passwordDisplay" class="togglePassword">
              <eye v-if="passwordDisplay" />
              <eyeClose v-else />
            </div>
          </template>
        </a-input>
      </a-form-item>
    </a-form>
    <!-- 自定义对话框按钮 -->
    <template #footer>
      <a-button
        :loading="validating"
        @click="validatePassword"
        key="submit"
        type="primary"
        v-text="'确定'"
      />
    </template>
  </a-modal>
</template>
<script lang="ts">
import { createComponent, onMounted, ref } from '@vue/composition-api';
import axios from 'axios';
import User from '|/icon/user.svg';
import Password from '|/icon/password.svg';
import Eye from '|/icon/eye.svg';
import EyeClose from '|/icon/eyeClose.svg';

interface Props {
  // 验证地址
  url: string;

  // 用户的autocomplete Key值
  userNameKey: string;

  // 密码的autocomplete Key值
  passwordKey: string;
}

export default createComponent<Props, {}>({
  name: 'PasswordModal',
  components: { User, Password, Eye, EyeClose },
  props: {
    url: { type: String, required: true },
    userNameKey: { type: String, default: '' },
    passwordKey: { type: String, default: 'password' }
  },
  setup(props, context) {
    const form = context.$form.createForm(this);

    // 对话框显隐
    const modalDisplay = ref(true);

    // 密码显隐
    const passwordDisplay = ref(false);

    // 按钮加载状态控制
    const validating = ref(false);

    // 验证密码
    const validatePassword = () => {
      form.validateFields(async (err: any, values: any) => {
        if (!err) {
          // 显示登录状态
          context.$message.loading('登陆中..', 0);
          validating.value = true;
          await axios.post(`${this.url}.php`, { password: values.password, userName: values.userName })
            .then(response => {
              context.$message.destroy();
              if (response.data === 'correct') {
                // 验证成狗
                modalDisplay.value = false; // 隐藏弹窗
                context.root.$store.commit('login', props.passwordKey); // 改变internalLogin state
                context.root.$store.commit('password', [props.passwordKey, values.password]); // 改变internalPassword state
                context.emit('login'); // 触发login事件
              } else {
                form.setFieldsValue({ password: '' });// 清空密码
                context.$message.error('密码错误'); // 提示密码错误
              }

              validating.value = false; // 取消加载状态
            });
        }
      });
    }

    const validate = (e: Event) => {
      e.preventDefault(); // 阻止原生事件刷新浏览器
      validatePassword();
    };

    onMounted(() => {
      // 检查登录状态
      if (context.root.$store.state.internalLogin === true) {
        // 已经登录，取消弹窗并触发login事件
        modalDisplay.value = false;
        context.emit('login');
      }
    })
  }
});
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
