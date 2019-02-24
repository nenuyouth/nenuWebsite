<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm" id="nav">
    <div class="navbar-toggler">
      <div class="nav-btn my-2" data-target="#mainNav" data-toggle="collapse" id="myNavBtn">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </div>
    </div>
    <router-link class="nav-brand" to="/">
      <img
        alt="东师青年"
        class="d-inline-block my-2 mr-2"
        src="/img/icon/nenuyouth.png"
        style="width:1.5rem;height:1.5rem;"
      >
      <span class="text-black" style="vertical-align:middle;">东北师范大学学生会</span>
    </router-link>
    <div class="collapse navbar-collapse" id="mainNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">主页</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/guide">东师指南</router-link>
        </li>
        <li class="nav-item dropdown">
          <a
            aria-expanded="false"
            aria-haspopup="true"
            class="nav-link dropdown-toggle"
            data-toggle="dropdown"
            href="#"
            id="dropdown1"
          >东师风貌</a>
          <div aria-labelledby="dropdown1" class="dropdown-menu">
            <router-link class="dropdown-item" to="/scene/benbu">本部校区</router-link>
            <router-link class="dropdown-item" to="/scene/jingyue">净月校区</router-link>
          </div>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">深入了解</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about/question">疑难解答</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script lang="ts">
import Vue from 'vue';

export default class BaseNav extends Vue {
  private mounted() {
    $(() => {
      $('.nav-btn').on('click', event => {
        $(event.currentTarget).toggleClass('active');
      });
    });
  }
}
</script>
<style scoped>
.navbar {
  padding: 0 0.5em;
}

.navbar-toggler {
  padding: 0.15em 0.4em;
  border: none;
}

/* 导航栏按钮*/
.nav-btn .line {
  width: 1.2rem;
  height: 0.1rem;
  background-color: rgba(0, 0, 0, 0.5);
  display: block;
  margin: 0.2rem auto;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

#myNavBtn.active .line:nth-child(2) {
  opacity: 0;
}

#myNavBtn.active .line:nth-child(1) {
  -webkit-transform: translateY(0.3rem) rotate(45deg);
  -ms-transform: translateY(0.3rem) rotate(45deg);
  -o-transform: translateY(0.3rem) rotate(45deg);
  transform: translateY(0.3rem) rotate(45deg);
}

#myNavBtn.active .line:nth-child(3) {
  -webkit-transform: translateY(-0.3rem) rotate(-45deg);
  -ms-transform: translateY(-0.3rem) rotate(-45deg);
  -o-transform: translateY(-0.3rem) rotate(-45deg);
  transform: translateY(-0.3rem) rotate(-45deg);
}

.navbar-brand {
  font-size: 1.1em;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  line-height: 1;
  font-weight: 500;
}

.nav-brand:hover {
  color: black;
  text-decoration: none;
}

.navbar-nav {
  text-align: center;
}

a .router-link-exact-active {
  color: #42b983;
}
</style>
<style>
/* nav调整 */
body {
  padding-top: 3rem;
}
</style>
