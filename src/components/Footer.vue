<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 网页页脚
 * @Date: 2019-02-26 23:43:23
 * @LastEditTime: 2019-03-23 12:43:26
 -->
<template>
  <a-layout-footer>
    <footer class="footer">
      <a-row align="middle" class="text-center" justify="space-around" type="flex">
        <a-col :lg="12" :xs="24" class="text-center">
          <img alt="Nenuyouth" class="mb-2 footerLogo" src="/img/icon/nenuyouth.png">
          <small class="d-block my-1 text-muted">东北师范大学校学生会</small>
          <small class="d-block my-1 text-muted">辽ICP备18007023号</small>
          <small class="d-block mt-1 mb-2 text-muted">维护者：Mr.Hope</small>
        </a-col>
        <a-col :lg="6" :xs="12" class="text-sm-center">
          <h3 class="text-white">关于我们</h3>
          <div class="text-small">
            <div class="mb-1">
              <router-link class="text-muted" to="/intro">校学生会介绍</router-link>
            </div>
            <div class="mb-1">
              <router-link class="text-muted" to="/intro">部门分工</router-link>
            </div>
            <div class="mb-1">
              <router-link class="text-muted" to="/coperation">项目合作</router-link>
            </div>
            <div class="mb-1">
              <router-link class="text-muted" to="/about/mr-hope">关于Mr.Hope</router-link>
            </div>
          </div>
        </a-col>
        <a-col :lg="6" :xs="12" class="text-sm-center">
          <h3 class="text-white">其他媒体</h3>
          <div class="text-small">
            <div class="mb-1">
              <a
                class="text-muted"
                href="https://mp.weixin.qq.com/mp/profile_ext?action=home&amp;__biz=MzA5MTQ4NjUzMg==&amp;scene=126&amp;bizpsid=0&amp;subscene=0#wechat_redirect"
              >微信公众号</a>
            </div>
            <div class="mb-1">
              <a class="text-muted" href="https://weibo.com/u/6385873676">微博</a>
            </div>
            <div class="mb-1">
              <a class="text-muted" href="http://v.douyin.com/84sfcf/">抖音</a>
            </div>
            <div class="mb-1">
              <a
                class="text-muted"
                href="http://wpa.qq.com/msgrd?v=3&uin=1793612094&site=qq&menu=yes"
              >QQ</a>
            </div>
          </div>
        </a-col>
      </a-row>
    </footer>
  </a-layout-footer>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>
<style scoped>
.ant-layout-footer {
  background-color: #343a40;
}

@media (min-width: 992px) {
  .ant-layout-footer {
    position: fixed;
    left: 200px;
    z-index: -1;
    bottom: 0;
    width: calc(100vw - 200px);
  }
}
.footerLogo {
  width: 50px;
  height: 50px;
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
