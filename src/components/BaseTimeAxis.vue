<template>
  <div :id="myId" class="tiemAxisBox my-3">
    <div :key="item.title" class="timeline" v-for="(item, index) in timeList">
      <router-link :to="item.url" class="timeAxisCtn" v-if="item.url">
        <h3 :style="item.myStyle" class="timeAxisTitle">{{ item.title }}</h3>
        <div class="inner-content">
          <div class="timeline-icon" v-html="item.icon" v-if="item.icon"></div>
          <p class="description" v-html="list[index]"></p>
        </div>
      </router-link>
      <div class="timeAxisCtn" v-else>
        <h3 :style="item.myStyle" class="timeAxisTitle">{{ item.title }}</h3>
        <div class="inner-content">
          <div class="timeline-icon" v-html="item.icon" v-if="item.icon"></div>
          <p class="description" v-html="list[index]"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

interface TimeList {
  title: string;
  text: string;
  url?: string;
  icon?: string;
}

@Component
export default class BaseTimeAxis extends Vue {
  @Prop(Number) private myId!: number;

  @Prop({ required: true, type: Array })
  private timeList!: TimeList[];

  get list() {
    const list: string[] = [];

    this.timeList.forEach((element, index) => {
      list[index] = element.text
        .replace(/\n/gu, "<br/>")
        .replace(/\s/gu, "&ensp;");
    });

    return list;
  }
}
</script>
<style scoped>
.tiemAxisBox {
  padding: 150px 0 0;
  position: relative;
  display: inline-block;
  width: 100%;
}

.tiemAxisBox:before,
.tiemAxisBox:after {
  content: "";
  height: 30px;
  width: 50px;
  background: #909090;
  border-radius: 50%;
  transform: translateX(-50%);
  position: absolute;
  left: 50%;
  top: 0;
  z-index: 2;
}
.tiemAxisBox:after {
  top: auto;
  bottom: -10px;
}
.tiemAxisBox .timeline {
  width: 52.3%;
  float: left;
  display: block;
  position: relative;
  z-index: 1;
}
.tiemAxisBox .timeAxisCtn {
  color: #000;
  border-right: 50px solid #e5e5e5;
  padding: 40px 30px 20px 0;
  display: block;
  position: relative;
}
.tiemAxisBox .timeAxisCtn:hover {
  text-decoration: none;
}
.tiemAxisBox .timeAxisCtn:before,
.tiemAxisBox .timeAxisCtn:after {
  content: "";
  background-color: #00b3ad;
  height: 80px;
  width: 50px;
  border-radius: 23px;
  position: absolute;
  right: -50px;
  top: 30px;
}
.tiemAxisBox .timeAxisCtn:before {
  background-color: #047a74;
  height: 30px;
  border-radius: 50%;
  z-index: 1;
}
.tiemAxisBox .timeAxisTitle {
  color: #fff;
  background-color: #00b3ad;
  font-weight: 800;
  font-size: 20px;
  padding: 10px 25px;
  margin: 0 0 35px 0;
  -webkit-clip-path: polygon(95% 0, 100% 50%, 95% 100%, 0 100%, 0 0);
  clip-path: polygon(95% 0, 100% 50%, 95% 100%, 0 100%, 0 0);
}
.tiemAxisBox .inner-content {
  /* padding-right: 80px; */
  padding: 0 80px 0 10px;
  position: relative;
}
.tiemAxisBox .timeline-icon {
  color: #fff;
  background-color: #00b3ad;
  font-size: 40px;
  text-align: center;
  line-height: 60px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  position: absolute;
  right: 0;
  top: 5px;
}
.tiemAxisBox .description {
  font-size: 16px;
  text-align: left;
  line-height: 1.5;
  min-height: 100px;
}
.tiemAxisBox .timeline:nth-child(odd) {
  margin-top: -12%;
}
.tiemAxisBox .timeline:nth-child(even) {
  float: right;
  width: 52.3%;
  margin-top: -12%;
}
.tiemAxisBox .timeline:nth-child(even) .timeAxisCtn {
  border-right: 0 solid transparent;
  border-left: 50px solid #e5e5e5;
  padding: 40px 0 20px 30px;
}
.tiemAxisBox .timeline:nth-child(even) .timeAxisCtn:before,
.tiemAxisBox .timeline:nth-child(even) .timeAxisCtn:after {
  right: auto;
  left: -50px;
}
.tiemAxisBox .timeline:nth-child(even) .inner-content {
  padding-right: 20px;
  /* padding-right: 0; */
  padding-left: 80px;
}
.tiemAxisBox .timeline:nth-child(even) .timeAxisTitle {
  padding: 10px 25px 10px 40px;
  -webkit-clip-path: polygon(5% 0, 100% 0, 100% 100%, 5% 100%, 0 50%);
  clip-path: polygon(5% 0, 100% 0, 100% 100%, 5% 100%, 0 50%);
}
.tiemAxisBox .timeline:nth-child(even) .timeline-icon {
  right: auto;
  left: 0;
}
.tiemAxisBox .timeline:nth-child(4n + 2) .timeline-icon,
.tiemAxisBox .timeline:nth-child(4n + 2) .timeAxisTitle,
.tiemAxisBox .timeline:nth-child(4n + 2) .timeAxisCtn:after {
  background-color: #ff534f;
}
.tiemAxisBox .timeline:nth-child(4n + 2) .timeAxisCtn:before {
  background-color: #a02724;
}
.tiemAxisBox .timeline:nth-child(4n + 3) .timeline-icon,
.tiemAxisBox .timeline:nth-child(4n + 3) .timeAxisTitle,
.tiemAxisBox .timeline:nth-child(4n + 3) .timeAxisCtn:after {
  background-color: #9642a4;
}
.tiemAxisBox .timeline:nth-child(4n + 3) .timeAxisCtn:before {
  background-color: #6d167c;
}
.tiemAxisBox .timeline:nth-child(4n + 4) .timeline-icon,
.tiemAxisBox .timeline:nth-child(4n + 4) .timeAxisTitle,
.tiemAxisBox .timeline:nth-child(4n + 4) .timeAxisCtn:after {
  background-color: #fab030;
}
.tiemAxisBox .timeline:nth-child(4n + 4) .timeAxisCtn:before {
  background-color: #ba7807;
}
@media screen and (max-width: 1200px) {
  .tiemAxisBox {
    padding: 130px 0 0;
  }
  .tiemAxisBox .timeline {
    width: 52.75%;
  }
  .tiemAxisBox .timeline:nth-child(even) {
    width: 52.75%;
  }
}
@media screen and (max-width: 990px) {
  .tiemAxisBox {
    padding: 100px 0 0;
  }
  .tiemAxisBox .timeline {
    width: 53.7%;
  }
  .tiemAxisBox .timeline:nth-child(even) {
    width: 53.7%;
  }
  .tiemAxisBox .inner-content {
    padding-right: 80px;
    padding-left: 20px;
  }
  .tiemAxisBox .timeline:nth-child(even) .inner-content {
    padding-left: 80px;
    padding-left: 20px;
  }
}
@media screen and (max-width: 767px) {
  .tiemAxisBox {
    padding: 17px 0 0;
  }
  .tiemAxisBox:before,
  .tiemAxisBox:after {
    transform: translateX(0);
    left: 0;
  }
  .tiemAxisBox:after {
    top: auto;
    bottom: -10px;
  }
  .tiemAxisBox .timeline:nth-child(odd) {
    margin-top: 0;
  }
  .tiemAxisBox .timeline,
  .tiemAxisBox .timeline:nth-child(even) {
    width: 100%;
    margin-top: 0;
    float: right;
  }
  .tiemAxisBox .timeline .timeAxisTitle {
    padding: 10px 25px 10px 30px;
    -webkit-clip-path: polygon(5% 0, 100% 0, 100% 100%, 5% 100%, 0 50%);
    clip-path: polygon(5% 0, 100% 0, 100% 100%, 5% 100%, 0 50%);
  }
  .tiemAxisBox .timeline-icon {
    right: auto;
    left: 0;
  }
  .tiemAxisBox .inner-content {
    padding-right: 0;
    padding-left: 80px;
  }
  .tiemAxisBox .timeAxisCtn:before,
  .tiemAxisBox .timeAxisCtn:after {
    right: auto;
    left: -50px;
  }
  .tiemAxisBox .timeAxisCtn {
    border-right: 0 solid transparent;
    border-left: 50px solid #e5e5e5;
    padding: 40px 0 20px 30px;
  }
}
@media screen and (max-width: 479px) {
  .tiemAxisBox .timeline .timeAxisTitle,
  .tiemAxisBox .timeline:nth-child(even) .timeAxisTitle {
    font-size: 16px;
    padding: 10px 5px 10px 25px;
  }
  .tiemAxisBox .timeline:nth-child(even) .inner-content,
  .tiemAxisBox .inner-content {
    padding-right: 0;
    padding-left: 15px;
  }
  .tiemAxisBox .timeline:nth-child(even) .timeline-icon,
  .tiemAxisBox .timeline-icon {
    transform: scale(0.83);
    right: auto;
    left: -86px;
  }
}
</style>
