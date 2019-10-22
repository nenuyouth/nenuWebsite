<template>
  <div class="listCtn">
    <div
      :key="item.text"
      @click="$navigate(item.url,$router,$route)"
      class="listItemCtn"
      is="div"
      v-for="item in list"
    >
      <div class="title">{{item.text}}</div>
      <div class="time">{{item.time}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface LectureListItem {
  text: string;
  time: string;
  url: string;
}

@Component
export default class LectureList extends Vue {
  @Prop(Array) private readonly list!: LectureListItem;
}
</script>
<style scoped>
.listCtn {
  width: 100%;
}
.listItemCtn {
  padding: 6px 8px;
}

.title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
}
.time {
  text-align: right;
  color: #444;
  font-size: 15px;
}
</style>
