<template>
  <div :id="myId" class="ImgCtn">
    <div class="imgCtn" v-if="!loaded">
      <img :src="require(`@/icon/${error ? 'error' : 'loading'}.svg`)" class="imgIcon">
      <span>{{ error ? "图片加载失败" : "加载中..." }}</span>
    </div>
    <img :src="src" class="img" v-else>
    <div class="imgDesc" v-text="desc ? '▲' + desc : ''"></div>
  </div>
</template>
<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';

export default class BaseImg extends Vue {
  @Prop(Number) private myId!: number;

  @Prop({ type: String, required: true }) private src!: string;

  @Prop(String) private desc!: string;

  // 图片载入状态
  private loaded = false;

  private error = false;

  private mounted() {
    // 加载图片
    const img = new Image(); // 创建新Image实例

    img.src = this.src;

    // 如果图片已经被缓存立即结束函数
    if (img.complete) {
      this.loaded = true;

      return;
    }

    // 图片加载出错
    img.onerror = () => {
      this.error = true;
    };

    // 图片加载成功
    img.onload = () => {
      this.loaded = true;
      delete img.onload;
    };
  }
}
</script>
<style scoped>
.ImgCtn {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.imgIcon {
  width: 30px;
  height: 30px;
  margin-right: 20px;
}

.imgCtn {
  width: 90%;
  height: 50px;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px 5%;
  border-radius: 8px;
  background-color: #efeef4;
  color: #888;
  max-width: 560px !important;
}

.img {
  width: 90% !important;
  margin: 4px 5%;
  border-radius: 8px;
  max-width: 560px !important;
}

.P .img {
  width: 100%;
  margin: 4px 0;
}

@media (min-width: 768px) {
  .img {
    margin-top: 12px;
    margin-bottom: 12px;
  }
}

.imgDesc {
  margin-top: -2px;
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  color: #222;
  letter-spacing: 1px;
}

@media (min-width: 768px) {
  .imgDesc {
    font-size: 14px;
  }
}

.nm .imgDesc {
  color: #ddd;
}
</style>
