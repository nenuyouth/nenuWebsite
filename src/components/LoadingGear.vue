<template>
  <div class="loadingGear">
    <Gear class="loader1"/>
    <GearGreen class="loader2"/>
    <Gear class="loader3"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Gear from 'assets/icon/gear.svg';
import GearGreen from 'assets/icon/gearGreen.svg';

@Component({ components: { Gear, GearGreen } })
export default class LoadingGear extends Vue {}
</script>

<style scoped>
.loadingGear {
  width: 60px;
  height: 60px;
  position: absolute;
  top: calc(50vh - 30px);
  left: calc(50% - 30px);
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
  color: #2ecc71;
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
