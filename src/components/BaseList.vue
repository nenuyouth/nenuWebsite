<template>
  <div :id="myId" class="Ctn">
    <template v-if="head !== false">
      <div class="d-block d-lg-none commonhead">{{ head }}</div>
      <div class="d-none d-lg-block myH3">{{ head }}</div>
    </template>
    <div class="Lctn">
      <template v-for="List in listItem">
        <div
          :class="List.url || List.aim ? 'btn btn-light ' : ''"
          :id="List.id"
          :key="List.text"
          class="listCtn"
          v-if="List.display !== false && (List.url || List.aim)"
        >
          <div @click="navigate(List.aim)" class="list-Container" v-if="List.aim">
            <img :src="List.icon" class="listIcon" v-if="List.icon">
            <div class="LinkText">{{ List.text }}</div>
            <div class="linkDesciption access">{{ List.desc }}</div>
          </div>
          <router-link :to="List.url" class="list-Container" v-else-if="List.url">
            <img :src="List.icon" class="listIcon" v-if="List.icon">
            <div class="LinkText">{{ List.text }}</div>
            <div class="linkDesciption access">{{ List.desc }}</div>
          </router-link>
          <div class="list-Container" v-else>
            <img :src="List.icon" class="listIcon" v-if="List.icon">
            <div class="LinkText">{{ List.text }}</div>
            <div class="linkDesciption">{{ List.desc }}</div>
          </div>
        </div>
        <div
          :class="List.icon ? 'listIconDivline' : ''"
          :key="List.textKey"
          class="link-divline"
          v-if="List.display !== false"
        ></div>
      </template>
    </div>
    <div class="commonfoot" v-if="foot">{{ foot }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface List {
  [propName: string]: string;
}

@Component
export default class BaseList extends Vue {
  @Prop(Number) private myId!: number;

  @Prop({ type: Array, required: true }) private content!: List[];

  @Prop([String, Boolean]) private head!: string | boolean;

  @Prop([String, Boolean]) private foot!: string | boolean;

  private get listItem() {
    // 创建副本
    const listItem = JSON.parse(JSON.stringify(this.content));

    listItem.forEach((element: List, index: number) => {
      if (this.myId) element.id = `list${this.myId}-${index}`;
      element.textKey = `${element.text}Key`;
    });

    return listItem;
  }

  private navigate(aim: string) {
    this.$router.push(`/guide/${aim}`);
  }
}
</script>
<style scope>
.Ctn {
  margin: 0 -15px;
  width: auto;
}

.myH3 {
  width: 100%;
  max-width: 600px;
  text-align: left;
  font-weight: 500;
  padding: 12px 5% 4px 5%;
  min-height: 24px;
  font-size: 22px;
  max-width: 600px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .myH3 {
    min-height: 26px;
    font-size: 24px;
  }
  .Ctn {
    margin: 0 auto;
  }
}

.myH3 + .myH3 {
  padding-top: 2px;
}

.commonfoot,
.commonhead {
  font-size: 13px;
  color: #666;
  padding: 5px 15px 0 15px;
  margin: 0 auto;
}

@media (min-width: 992px) {
  .commonfoot {
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
  width: 100%;
  background-color: #fefefe;
  border-bottom: 1px #cac9ce solid;
  border-top: 1px #cac9ce solid;
}

@media (min-width: 600px) {
  .Lctn {
    border: 1px #cac9ce solid;
  }
}

.nm .Lctn {
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
}

.listCtn:empty {
  padding: 0;
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
}

.access:after {
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

.nm .access:after {
  border-color: #383833;
}

.link-divline {
  width: calc(100% - 15px);
  height: 1px;
  margin-left: 15px;
  background-color: #cac9ce;
}

.listIconDivline {
  margin-left: 50px;
  width: calc(100% - 50px);
}

.nm .link-divline {
  background-color: #353631;
}

.link-divline:last-child {
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
