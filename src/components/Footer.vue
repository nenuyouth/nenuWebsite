<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 网页页脚
 * @Date: 2019-02-26 23:43:23
 * @LastEditTime: 2019-03-21 18:43:00
 -->
<template>
  <div id="footer">
    <div @click="scrollTop" class="scrollTop" style="display:none">
      <div class="backTop">
        <icon-font style="font-size:30px;" type="icon-backTop"/>
      </div>
    </div>
    <footer class="footer">
      <div class="container">
        <a-row class="justify-content-sm-center text-left">
          <a-col :lg="12" :sm="24" class="text-center">
            <img alt="Nenuyouth" class="mb-3" height="54" src="/img/icon/nenuyouth.png" width="54">
            <small class="d-block my-1 text-muted">东北师范大学校学生会</small>
            <small class="d-block my-1 text-muted">辽ICP备18007023号</small>
            <small class="d-block mt-1 mb-2 text-muted">维护者：Mr.Hope</small>
          </a-col>
          <a-col :lg="6" :sm="12" class="text-sm-center">
            <h3 class="text-white">关于我们</h3>
            <div class="text-small">
              <div>
                <router-link class="text-muted" to="/intro">校学生会介绍</router-link>
              </div>
              <div>
                <router-link class="text-muted" to="/intro">部门分工</router-link>
              </div>
              <div>
                <router-link class="text-muted" to="/coperation">项目合作</router-link>
              </div>
              <div>
                <router-link class="text-muted" to="/about/mr-hope">关于Mr.Hope</router-link>
              </div>
            </div>
          </a-col>
          <a-col :lg="6" :sm="12" class="text-sm-center">
            <h3 class="text-white">其他媒体</h3>
            <div class="text-small">
              <div>
                <a
                  class="text-muted"
                  href="https://mp.weixin.qq.com/mp/profile_ext?action=home&amp;__biz=MzA5MTQ4NjUzMg==&amp;scene=126&amp;bizpsid=0&amp;subscene=0#wechat_redirect"
                >微信公众号</a>
              </div>
              <div>
                <a class="text-muted" href="https://weibo.com/u/6385873676">微博</a>
              </div>
              <div>
                <a class="text-muted" href="http://v.douyin.com/84sfcf/">抖音</a>
              </div>
              <div>
                <a
                  class="text-muted"
                  href="http://wpa.qq.com/msgrd?v=3&uin=1793612094&site=qq&menu=yes"
                >QQ</a>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
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
  width: 30px;
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
