<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 网页页脚
 * @Date: 2019-02-26 23:43:23
 * @LastEditTime: 2019-03-19 13:22:26
 -->
<template>
  <div id="footer">
    <div @click="scrollTop" class="scrollTop" style="display:none">
      <div class="backTop">
        <svg viewBox="0 0 1024 1024">
          <path
            d="M512 0C229.517 0 0 229.517 0 512s227.752 512 512 512c282.483 0 512-227.752 512-512C1024
            229.517 794.483 0 512 0zM351.338 271.89h305.434c14.125 0 26.483 12.358 26.483 26.482s-12.358
            26.483-26.483 26.483H351.338c-14.124 0-26.483-12.358-26.483-26.483 0-15.89 12.359-26.482
            26.483-26.482z m331.917 303.669c-12.358 12.358-33.545 12.358-45.903 0L531.42 471.393v270.124c0
            14.124-12.359 26.483-26.483 26.483s-26.483-12.359-26.483-26.483v-271.89l-105.93 104.166c-12.36
            12.359-33.546 12.359-45.904 0-12.359-12.359-12.359-31.78 0-45.903l155.365-151.835c7.062-7.062
            14.124-8.827 22.952-8.827s15.89 3.53 22.952 8.827L683.255 527.89c12.359 15.89 12.359 35.31 0 47.669z"
            fill="#3cc51f"
          ></path>
        </svg>
      </div>
    </div>
    <footer class="footer">
      <div class="container">
        <div class="row justify-content-sm-center text-left">
          <div class="col-sm-12 col-lg-6 text-center">
            <img alt="Nenuyouth" class="mb-3" height="54" src="/img/icon/nenuyouth.png" width="54">
            <small class="d-block my-1 text-muted">东北师范大学校学生会</small>
            <small class="d-block my-1 text-muted">辽ICP备18007023号</small>
            <small class="d-block my-1 text-muted">维护者：Mr.Hope</small>
          </div>
          <div class="col-sm-6 col-lg-3 text-sm-center">
            <h5 class="text-white">关于我们</h5>
            <ul class="list-unstyled text-small">
              <li>
                <router-link class="text-muted" to="/intro">校学生会介绍</router-link>
              </li>
              <li>
                <router-link class="text-muted" to="/intro">部门分工</router-link>
              </li>
              <li>
                <router-link class="text-muted" to="/coperation">项目合作</router-link>
              </li>
              <li>
                <router-link class="text-muted" to="/about/mr-hope">关于Mr.Hope</router-link>
              </li>
            </ul>
          </div>
          <div class="col-sm-6 col-lg-3 text-sm-center">
            <h5 class="text-white">其他媒体</h5>
            <ul class="list-unstyled text-small">
              <li>
                <a
                  class="text-muted"
                  href="https://mp.weixin.qq.com/mp/profile_ext?action=home&amp;__biz=MzA5MTQ4NjUzMg==&amp;scene=126&amp;bizpsid=0&amp;subscene=0#wechat_redirect"
                >微信公众号</a>
              </li>
              <li>
                <a class="text-muted" href="https://weibo.com/u/6385873676">微博</a>
              </li>
              <li>
                <a class="text-muted" href="http://v.douyin.com/84sfcf/">抖音</a>
              </li>
              <li>
                <a
                  class="text-muted"
                  href="http://wpa.qq.com/msgrd?v=3&uin=1793612094&site=qq&menu=yes"
                >QQ</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class BaseFooter extends Vue {
  // 返回顶部函数
  private scrollTop() {
    $('body,html').animate({ scrollTop: 0 }, 800);
  }

  private mounted() {
    // 注册“返回顶部”按钮动作
    window.addEventListener('scroll', () => {
      if (($(window).scrollTop() || window.pageYOffset) > 100) $('.scrollTop').fadeIn(500);
      else $('.scrollTop').fadeOut(500);
    });
  }
}
</script>
<style scoped>
.footer {
  background-color: #343a40;
  padding-top: 3rem;
}

@media (min-width: 992px) {
  .footer {
    position: fixed;
    z-index: -1;
    bottom: 0;
    width: 100%;
  }
}
.backTop {
  background-color: #fff;
  border-radius: 50%;
}
.scrollTop {
  position: fixed;
  right: 20px;
  bottom: 60px;
  z-index: 1030;
  width: 35px;
}
</style>
<style>
/* footer调整 */
@media (min-width: 992px) {
  #app {
    background-color: #fff;
    margin-bottom: 192px;
  }
}
</style>
