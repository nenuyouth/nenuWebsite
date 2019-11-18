<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 基础列表
 * @Date: 2019-03-25 12:39:59
 * @LastEditTime: 2019-08-25 19:49:00
-->
<template>
  <div :id="myId" class="Ctn">
    <template v-if="head !== false">
      <div class="d-block d-lg-none commonhead" v-text="head" />
      <div class="d-none d-lg-block myH3" v-text="head" />
    </template>
    <div class="Lctn">
      <template v-for="List in listItem">
        <div
          v-if="List.display !== false && (List.url || List.aim)"
          :id="List.id"
          :key="List.text"
          :class="List.url || List.aim ? 'btn btn-light ' : ''"
          class="listCtn"
        >
          <div v-if="List.aim" class="list-Container" @click="navigate(List.aim)">
            <img v-if="List.icon" :src="`/img${List.icon}`" class="listIcon" />
            <div class="LinkText" v-text="List.text" />
            <div class="linkDesciption access" v-text="List.desc" />
          </div>
          <router-link v-else-if="List.url" :to="List.url" class="list-Container">
            <img v-if="List.icon" :src="List.icon" class="listIcon" />
            <div class="LinkText" v-text="List.text" />
            <div class="linkDesciption access" v-text="List.desc" />
          </router-link>
          <div v-else class="list-Container">
            <img v-if="List.icon" :src="`/img${List.icon}`" class="listIcon" />
            <div class="LinkText" v-text="List.text" />
            <div class="linkDesciption" v-text="List.desc" />
          </div>
        </div>
        <div
          v-if="List.display !== false"
          :key="List.textKey"
          :class="List.icon ? 'listIcon' : ''"
          class="link-divline"
        />
      </template>
    </div>
    <div v-if="foot" class="commonfoot" v-text="foot" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface List {
  [propName: string]: string;
}

@Component
export default class BaseList extends Vue {
  // Component ID
  @Prop(Number) private readonly myId!: number;

  // List content
  @Prop({ type: Array, required: true }) private readonly content!: List[];

  // List head text
  @Prop({ type: [String, Boolean], default: '' }) private readonly head!: string | boolean;

  // List footer text
  @Prop({ type: [String, Boolean], default: '' }) private readonly foot!: string | boolean;

  private get listItem() {
    // create a copy of @Prop('content)
    const listItem = JSON.parse(JSON.stringify(this.content));

    // Add key and item for the listitem in the copy
    listItem.forEach((element: List, index: number) => {
      if (this.myId) element.id = `list${this.myId}-${index}`;
      element.textKey = `${element.text}Key`;
    });

    return listItem;
  }

  // Navigate when clicking on a link
  private navigate(aim: string) {
    this.$router.push(`/guide/${aim}`);
  }
}
</script>
<style lang='scss' scope>
@import '~%/Weui/scss/border';

.Ctn {
  margin: 0 -15px;
  width: auto;
  @media (min-width: 768px) {
    margin: 0 auto;
  }
}

.myH3 {
  width: 100%;
  max-width: 600px;
  min-height: 18px;
  padding: 12px 18px 6px 18px;
  margin: 0 auto;
  font: {
    size: 18px;
    weight: 500;
  }
  text-align: left;
}

.commonfoot,
.commonhead {
  font-size: 13px;
  color: #666;
  margin: 0 auto;
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
    max-width: 600px;
  }
}

.nm .commonhead {
  color: #fff;
}

.LinkText,
.commonhead,
.commonfoot {
  text-align: left;
}

.Lctn {
  background-color: #fefefe;
  width: 100%;
  position: relative;
  @media (max-width: 600px) {
    &:before {
      @include topBorder(#cac9ce);
    }
    &:after {
      @include bottomBorder(#cac9ce);
    }
  }
  @media (min-width: 600px) {
    &:before {
      @include allBorder(#cac9ce);
    }
  }
}

.nm .Lctn:after,
.nm .Lctn:before {
  border-color: #353631;
}

.listCtn {
  width: 100%;
  padding: 0 15px;
  font-size: 17px;
  line-height: 1.45;
  border-radius: 0;
  border: none;
  color: #000;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &:active {
    background-color: #ececec;
  }
  &:empty {
    padding: 0;
  }
}

.nm .listCtn {
  background-color: #000;
  color: #fff !important;
}

.LinkText {
  padding: 10px 0;
  line-height: 1.5;
}

.listIcon {
  width: 26px;
  height: 26px;
  margin-right: 10px;
}

.list-Container {
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
}

.list-Container,
.LinkText {
  -webkit-flex: 1;
  flex: 1;
}

.linkDesciption {
  color: #999 !important;
  text-align: right;
}

.access {
  padding-right: 15px;
  position: relative;
  &:after {
    content: ' ';
    display: inline-block;
    width: 7px;
    height: 7px;
    border-width: 2px 2px 0 0;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: absolute;
    top: 50%;
    margin-top: -5px;
    right: 2px;
    border-color: #c7c7cc;
  }
}

.nm .access:after {
  border-color: #383833;
}

.link-divline {
  position: relative;
  &:after {
    @include bottomBorder(#cac9ce);
    left: 15px;
  }
}

.listIcon.link-divline {
  width: 100%;
  height: 0;
  &:after {
    left: 50px;
  }
}

.nm .link-divline:after {
  border-color: #353631;
}

.link-divline:last-child:after {
  display: none;
}

.nm .Lctn {
  background-color: #000;
  color: #fff;
}

.nm .LinkText {
  color: #fff;
}

.btn-fix {
  color: #212529;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
}
</style>
