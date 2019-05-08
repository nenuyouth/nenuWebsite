<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 基础图片
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-05-05 15:07:44
-->
<template>
  <div :id="myId" class="ImgCtn">
    <div class="imgCtn" v-if="!loaded">
      <Error class="imgIcon" v-if="error"/>
      <Loading class="imgIcon" v-else/>
      <span v-text="error ? '图片加载失败' : '加载中...'"/>
    </div>
    <img :src="src" @click="showImg = true" class="img" v-else>
    <div class="imgDesc" v-if="desc" v-text="`▲${desc}`"/>
    <div @click="showImg = false" class="preview" v-if="showImg">
      <img :src="src" class="previewImg">
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Loading from 'assets/icon/loading.svg';
import Error from 'assets/icon/error.svg';

@Component({ components: { Loading, Error } })
export default class BaseImg extends Vue {
  // Component ID
  @Prop(Number) private readonly myId!: number;

  // Image link address
  @Prop({ type: String, required: true }) private readonly src!: string;

  // Image description
  @Prop(String) private readonly desc!: string;

  // Image load status
  private loaded = false;
  private error = false;

  // Whether to display image or not
  private showImg = false;

  private mounted() {
    const img = new Image(); // Create new Image instance

    img.src = this.src;

    // Image has been cached
    if (img.complete) {
      this.loaded = true;

      return;
    }

    // Error when loading Image, show error message
    img.onerror = () => {
      this.error = true;
    };

    // Sucess loading Image, display this Image now
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
.ImgCtn + .ImgCtn {
  margin-top: 8px;
}
.imgIcon {
  width: 36px;
  height: 36px;
}

.imgCtn {
  width: 96%;
  height: 60px;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px 2%;
  border-radius: 8px;
  background-color: #efeef4;
  color: #888;
  max-width: 560px !important;
}

.img {
  width: 96% !important;
  margin: 4px 2%;
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

.preview {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000026;
}

.previewImg {
  max-width: 90%;
  max-height: 100%;
  border-radius: 5px;
}
</style>
