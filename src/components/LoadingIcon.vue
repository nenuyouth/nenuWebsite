<template>
  <div class="loader-wrapper">
    <img alt="加" class="loader1" src="/img/icon/gear.svg">
    <img alt="载" class="loader2" src="/img/icon/gearRed.svg">
    <img alt="中" class="loader3" src="/img/icon/gear.svg">
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default class LoadingIcon extends Vue {}
</script>

<style>
.loader-wrapper {
  width: 60px;
  height: 60px;
  margin: 20px auto 10px auto;
  position: relative;
}
.loader1 {
  display: block;
  position: absolute;
  width: 35px;
  height: 35px;
  top: -20px;
  left: 3px;
  animation: rotateReverse 1s infinite linear;
}

.loader2 {
  display: block;
  position: absolute;
  color: #d72f2b;
  height: 50px;
  width: 50px;
  right: -12px;
  animation: rotate 1s infinite linear;
}

.loader3 {
  display: block;
  position: absolute;
  width: 35px;
  height: 35px;
  bottom: -10px;
  left: 3px;
  animation: rotateReverse 1s infinite linear;
}

@keyframes rotateReverse {
  100% {
    transform: rotate(-180deg);
  }
}

@keyframes rotate {
  100% {
    transform: rotate(180deg);
  }
}
</style>
