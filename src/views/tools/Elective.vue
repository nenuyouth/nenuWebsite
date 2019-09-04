<template>
  <div class="container">
    <h1>选课系统登录</h1>
    <form action="xk/LoginToXkLdap" id="xkForm" method="post">
      用户名：
      <a-input
        autocomplete="electiveUserName"
        id="IDToken1"
        maxlength="20"
        name="IDToken1"
        suffix="@nenu.edu.cn"
        type="text"
        v-model="userName"
      />
      <br />密 码：
      <a-input
        autocomplete="electivePassword"
        id="IDToken2"
        maxlength="20"
        name="IDToken2"
        type="password"
        v-model="password"
      />
      <br />
      <a-input id="RANDOMCODE" name="RANDOMCODE" type="hidden" value="1234" />
      <a-input id="ymyzm" name="ymyzm" type="hidden" value="1234" />
      <a-button @click="login" href="#">登录</a-button>
    </form>请选择需要登陆的服务器：(0-3)
    <input id="SERVER" type="number" v-model="server" value="0" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import PasswordModal from '#/PasswordModal.vue';

@Component({ components: { PasswordModal } })
export default class Elective extends Vue {
  private serverData = [
    'http://xk.nenu.edu.cn:80/',
    'http://222.27.96.92:80/qzxk/',
    'http://222.27.96.193:7001/qzxk/',
    'http://222.27.96.94:80/qzxk/'
  ];

  private userName = '';
  private password = '';
  private server = 0;

  // private login() {
  private login() {
    if (!this.userName || !this.password) {
      alert('输入账号密码！');

      return;
    }

    axios.post('https://nenuyouth.com/server/electiveLogin.php', { password: this.password, userName: this.userName })
      .then(() => {
        (document.getElementById('xkForm') as HTMLFormElement).action =
          `${this.serverData[this.server]}xk/LoginToXkLdap?url=${this.serverData[this.server]}xk/LoginToXkLdap`;
        (document.getElementById('xkForm') as HTMLFormElement).submit();
      });
  }
}
</script>
