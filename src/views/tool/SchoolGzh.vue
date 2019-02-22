<template>
  <div class="container">
    <h2 class="px-3 pt-3">学院微信</h2>
    <hr class="mx-3">
    <div class="row px-3">
      <a :href="item.url" :key="item.text" class="col-4 col-sm-3 col-md-2 col-lg-1 col-fix" v-for="item in gzh">
        <img
          :src="require(`@/icon/function/schoolGzh/${item.src}.jpg`)"
          class="img-thumbnail mt-1 img-fix"
          style="border-radius:50%;"
        >
        <p class="mx-1 my-2 gzhName">{{ item.text }}</p>
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseCarousel from "@/components/BaseCarousel.vue";

@Component
export default class SchoolGzh extends Vue {
  private gzh = [
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA3NTM3MTkzOQ==&scene=110#wechat_redirect",
      text: "美术学院",
      src: "art"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA5MjQ4NDM2MA==&scene=124#wechat_redirect",
      text: "传媒科学学院",
      src: "media"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI2OTA0NTMxMw==&scene=110#wechat_redirect",
      text: "教育学部",
      src: "education"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI2NTQ1ODA1NQ==&scene=124#wechat_redirect",
      text: "心理学院",
      src: "psychology"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI3ODAzMDg2MA==&scene=110#wechat_redirect",
      text: "政法学院",
      src: "political"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI1ODE0OTM5Ng==&scene=110#wechat_redirect",
      text: "经济学院",
      src: "economic"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0MzM3MDI4NQ==&scene=110#wechat_redirect",
      text: "商学院",
      src: "business"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA5MzAwMDA2OQ==&scene=110#wechat_redirect",
      text: "文学院",
      src: "literature"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA3MDk4ODQ2MA==&scene=110#wechat_redirect",
      text: "历史文化学院",
      src: "history"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIzNjY4Njc5Nw==&scene=110#wechat_redirect",
      text: "外国语学院",
      src: "foreign"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA3OTA3MDU2Ng==&scene=110#wechat_redirect",
      text: "音乐学院",
      src: "music"
    },

    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxNzA5OTgzNQ==&scene=110#wechat_redirect",
      text: "马克思主义学部",
      src: "Marxism"
    },

    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA4MDU5NjE3MA==&scene=110#wechat_redirect",
      text: "数学与统计学院",
      src: "math"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4Njc4NDM1NQ==&scene=124#wechat_redirect",
      text: "信息技术与科学学院",
      src: "information"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA3MDU5MTIyNA==&scene=110#wechat_redirect",
      text: "物理学院",
      src: "physics"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA3MDU5MTIyNA==&scene=110#wechat_redirect",
      text: "化学学院",
      src: "chemistry"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxNDMwNDk2MA==&scene=110#wechat_redirect",
      text: "生命科学学院",
      src: "biology"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA4NDgwMjQ4MQ==&scene=110#wechat_redirect",
      text: "地理科学学院",
      src: "geography"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA4NDQ1OTIwNw==&scene=110#wechat_redirect",
      text: "环境学院",
      src: "environment"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxNjA1NzM2Mg==&scene=110#wechat_redirect",
      text: "体育学院",
      src: "pe"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI1NTA5MDQwMg==&scene=110#wechat_redirect",
      text: "民族教育学院",
      src: "nation"
    },
    {
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIwMzI0NTE0NQ==&scene=110#wechat_redirect",
      text: "纽瓦克学院",
      src: "runin"
    }
  ];
}
// export default {
//   name: "SchoolGzh",
//   data: () => ({
//
//   })
// };
</script>
<style scoped>
.col-fix {
  padding: 0 5px;
}
.img-fix {
  width: 90%;
  margin: 0.25rem 5% 0 5%;
}
.gzhName {
  text-align: center;
  color: #000;
  font-size: 14px;
}
</style>
