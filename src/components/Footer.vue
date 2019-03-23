<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 网页页脚
 * @Date: 2019-02-26 23:43:23
 * @LastEditTime: 2019-03-23 22:36:55
 -->
<template>
  <a-layout-footer :class="slide?'slide':''" class="footer">
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
          <div :key="item[2]" class="mb-1" v-for="item in about">
            <router-link :to="item[0]" class="text-muted">{{item[1]}}</router-link>
          </div>
        </div>
      </a-col>
      <a-col :lg="6" :xs="12" class="text-sm-center">
        <h3 class="text-white">其他媒体</h3>
        <div class="text-small">
          <div :key="item[1]" class="mb-1" v-for="item in media">
            <a :href="item[0]" class="text-muted">{{item[1]}}</a>
          </div>
        </div>
      </a-col>
    </a-row>
  </a-layout-footer>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  private readonly about = [
    ['/intro', '校学生会介绍'],
    ['/intro', '部门分工'],
    ['/intro', '项目合作'],
    ['/intro', '关于Mr.Hope']
  ];

  private readonly media = [
    [
      'https://mp.weixin.qq.com/mp/profile_ext?action=home&amp;__biz=MzA5MTQ4NjUzMg==&amp;scene=126&amp;bizpsid=0&amp;subscene=0#wechat_redirect',
      '微信'
    ],
    ['https://weibo.com/u/6385873676', '微博'],
    ['http://v.douyin.com/84sfcf/', '抖音'],
    ['http://wpa.qq.com/msgrd?v=3&uin=1793612094&site=qq&menu=yes', 'QQ']
  ];

  // 动态改变页脚样式
  private get slide() {
    return this.$store.state.menuList.length;
  }
}
</script>
<style scoped>
.footer {
  background-color: #343a40;
}

@media (min-width: 992px) {
  .footer {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
  }
  .footer.slide {
    width: calc(100vw - 200px);
    left: 200px;
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
