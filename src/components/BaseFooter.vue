<template>
  <div id="footer">
    <div class="scrollTop" style="display:none">
      <img alt class="img-fluid backTop" src="/img/icon/backTop.svg">
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
                <a class="text-muted" href="http://wpa.qq.com/msgrd?v=3&amp;uin=1793612094&amp;site=qq&amp;menu=yes">QQ</a>
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
  private mounted() {
    $(window).scroll(() => {
      if (($(window).scrollTop() || window.pageYOffset) > 100)
        $('.scrollTop').fadeIn(500);
      else $('.scrollTop').fadeOut(500);
    });
    $('.scrollTop').click(() => {
      $('body,html').animate({ scrollTop: 0 }, 800);
    });
  }

  // FIXME: 页脚显示仍然异常
  @Watch('$route')
  private onRouteUpdate() {
    $('#footer').css('opacity', '0');
    setTimeout(() => {
      $('#footer').css('opacity', '1');
    }, 600);
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
