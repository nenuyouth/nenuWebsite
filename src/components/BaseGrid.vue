<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Base Grid
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-05-02 21:02:16
-->
<template>
  <div>
    <template v-if="head">
      <div class="d-block d-lg-none commonhead" v-text="head"/>
      <div class="d-none d-lg-block myH3" v-text="head"/>
    </template>

    <a-row class="gridList">
      <a-col
        :key="item[1]"
        :lg="3"
        :md="4"
        :xl="2"
        :xs="6"
        @click="navigate(item.url)"
        class="grid"
        v-for="item in content"
      >
        <img :alt="item.text" :src="item.icon" class="gridIcon">
        <div class="gridLabel" v-text="item.text"/>
      </a-col>
      <div class="commonfoot" v-if="foot" v-text="foot"/>
    </a-row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export interface GridItem {
  text: string; // 文字
  icon: string; // 图标地址
  url: string; // 网址链接
}

@Component
export default class BaseGrid extends Vue {
  // Component ID
  @Prop(Number) private myId!: number;

  // Grid items
  @Prop(Array) private content!: GridItem[];

  // Grid head text
  @Prop([String, Boolean]) private head!: string | boolean;

  // Grid footer text
  @Prop([String, Boolean]) private foot!: string | boolean;

  // Link Handler
  private navigate(url: string) {
    const route = this.$route;
    const router = this.$router;

    if (url && url[0] === '/')
      // 内部绝对路径
      router.push(url);
    else if (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1)
      // 外部链接
      window.open(url);
    else {
      // 内部相对路径
      const base = route.path.slice(0, route.path.lastIndexOf('/'));

      router.push(`${base}/${url}`);
    }
  }
}
</script>
<style scoped>
.gridList {
  overflow: hidden;
}
.gridList:before,
.gridList:after {
  display: block !important;
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  color: #cac9ce;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
.gridList:before {
  right: 0;
  height: 1px;
  border-top: 1px solid #cac9ce;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.gridList:after {
  width: 1px;
  bottom: 0;
  border-left: 1px solid #cac9ce;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}

.grid {
  position: relative;
  padding: 20px 10px;
  box-sizing: border-box;
  text-align: center;
}
.grid:before,
.grid:after {
  content: ' ';
  position: absolute;
  color: #cac9ce;
}
.grid:before {
  right: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-right: 1px solid #cac9ce;
  -webkit-transform-origin: 100% 0;
  transform-origin: 100% 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}
.grid:after {
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #cac9ce;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.gridIcon {
  width: 28px;
  height: 28px;
  margin: 0 auto;
}
@media (min-width: 992px) {
  .gridIcon {
    width: 36px;
    height: 36px;
    margin: 0 auto;
  }
}
.gridIcon + .gridLabel {
  margin-top: 4px;
}
.gridLabel {
  display: block;
  text-align: center;
  color: rgba(0, 0, 0, 0.9);
  font-size: 13px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
