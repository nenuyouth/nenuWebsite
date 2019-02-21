<template>
  <div class="row justify-content-center">
    <div class="col-12 col-lg-9">
      <div class="carousel slide" data-ride="carousel" id="mainCarousel">
        <ol class="carousel-indicators">
          <li class="active" data-slide-to="0" data-target="#mainCarousel"></li>
          <li data-slide-to="1" data-target="#mainCarousel"></li>
          <li data-slide-to="2" data-target="#mainCarousel"></li>
          <li data-slide-to="3" data-target="#mainCarousel"></li>
        </ol>
        <div class="carousel-inner">
          <a
            class="carousel-item active"
            href="https://mp.weixin.qq.com/s/w_CbkYVuTcByXCxEnlJ63w"
          >
            <img alt class="d-block w-100" src="@/assets/main0.jpg" />
            <div class="carousel-caption text-black prominent">
              <h1 class="display-4 d-none d-sm-block">NENUYouth</h1>
              <h1 class="font-weight-light d-block d-sm-none">NENUYouth</h1>
              <h1 class="lead">东师微信小程序已上线</h1>
              <p class="lead d-none d-sm-block">
                Wechat Miniprogram is released！
              </p>
              <p
                class="d-none d-lg-block text-right font-weight-light"
                style="line-height: 1;"
              >
                点击查看图文详情
              </p>
            </div>
          </a>
          <a
            class="carousel-item"
            href="https://mp.weixin.qq.com/s/yv66H-tCPyrHuSEc1cOK5Q"
          >
            <img alt class="d-block w-100" src="@/assets/main1.jpg" />
            <div class="carousel-caption prominent">
              <h1 class="display-4 d-none d-sm-block">我是东师</h1>
              <h1 class="font-weight-light d-block d-sm-none">我是东师</h1>
              <h1 class="lead">未来，请多指教</h1>
              <p class="lead d-none d-sm-block">New Experience, New Us!</p>
              <p
                class="d-none d-lg-block text-right font-weight-light"
                style="line-height: 1;"
              >
                点击查看图文详情
              </p>
            </div>
          </a>
          <a
            class="carousel-item"
            href="https://mp.weixin.qq.com/s/QcPo0a57ZY-aI5PWXbM7tA"
          >
            <img alt class="d-block w-100" src="@/assets/main2.jpg" />
            <div class="carousel-caption prominent">
              <h1 class="display-4 d-none d-sm-block">东师姑娘</h1>
              <h1 class="font-weight-light d-block d-sm-none">东师姑娘</h1>
              <h1 class="lead">这里有一首歌唱给你听~</h1>
              <p class="lead d-none d-sm-block">
                We prepare a song for you, girls.
              </p>
              <p
                class="d-none d-lg-block text-right font-weight-light"
                style="line-height: 1;"
              >
                点击查看图文详情
              </p>
            </div>
          </a>
          <a
            class="carousel-item"
            href="https://mp.weixin.qq.com/s/AEMOGFjza3k3ivx3gKVFOA"
          >
            <img alt class="d-block w-100" src="@/assets/main3.jpg" />
            <div class="carousel-caption text-black prominent">
              <h1 class="display-4 d-none d-sm-block">热点</h1>
              <h1 class="font-weight-light d-block d-sm-none">热点</h1>
              <h1 class="lead">2016年什么刷爆了东师人的朋友圈？</h1>
              <p class="lead d-none d-sm-block"></p>
              <p
                class="d-none d-lg-block text-right font-weight-light"
                style="line-height: 1;"
              >
                点击查看图文详情
              </p>
            </div>
          </a>
        </div>
        <a
          class="carousel-control-prev"
          data-slide="prev"
          href="#mainCarousel"
          role="button"
        >
          <span aria-hidden="true" class="carousel-control-prev-icon"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          data-slide="next"
          href="#mainCarousel"
          role="button"
        >
          <span aria-hidden="true" class="carousel-control-next-icon"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MainCarousel extends Vue {}
</script>
