<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Base Grid
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-08-25 19:03:48
-->
<template>
  <div>
    <template v-if="head !== false">
      <div class="d-block d-lg-none commonhead" v-text="head" />
      <div class="d-none d-lg-block myH3" v-text="head" />
    </template>
    <a-row class="gridList">
      <a-col
        v-for="item in content"
        :key="item[1]"
        :lg="3"
        :md="4"
        :xl="2"
        :xs="6"
        class="grid"
        @click="$navigate(item.url, $router, $route)"
      >
        <img :alt="item.text" :src="item.icon" class="gridIcon" />
        <div class="gridLabel" v-text="item.text" />
      </a-col>
      <div v-if="foot" class="commonfoot" v-text="foot" />
    </a-row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

export interface GridItem {
  text: string; // 文字
  icon: string; // 图标地址
  url: string; // 网址链接
}

@Component
export default class BaseGrid extends Vue {
  // Component ID
  @Prop(Number) private readonly myId!: number;

  // Grid items
  @Prop(Array) private readonly content!: GridItem[];

  // Grid head text
  @Prop({ type: [String, Boolean], default: "" }) private readonly head!:
    | string
    | boolean;

  // Grid footer text
  @Prop(String) private readonly foot!: string;
}
</script>
<style lang="scss" scoped>
@import "~%/Weui/scss/border";

.myH3 {
  width: 100%;
  text-align: left;
  font-weight: 500;
  padding: 12px 18px 6px 18px;
  min-height: 18px;
  font-size: 18px;
  margin: 0 auto;
}

.commonfoot,
.commonhead {
  font-size: 13px;
  color: #666;
  margin: 0 auto;
  text-align: left;
}

.commonhead {
  min-height: 9px;
  padding: 23px 15px 5px 15px;
}

.commonfoot {
  padding: 5px 15px 0 15px;
  @media (min-width: 992px) {
    font-size: 14px;
    padding: 12px 5% 4px 5%;
  }
}

.nm .commonhead,
.nm .commonfoot {
  color: #fff;
}

.gridList {
  overflow: hidden;
  &:before {
    display: block !important;
    @include topBorder(#cac9ce);
  }
  &:after {
    display: block !important;
    @include leftBorder(#cac9ce);
  }
}

.grid {
  position: relative;
  padding: 20px 10px;
  box-sizing: border-box;
  text-align: center;
  &:before {
    @include rightBorder(#cac9ce);
  }
  &:after {
    @include bottomBorder(#cac9ce);
  }
  &:active {
    background-color: #ececec;
  }
}

.gridIcon {
  width: 28px;
  height: 28px;
  margin: 0 auto;
  @media (min-width: 576px) {
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
