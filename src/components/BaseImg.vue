<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Base Image
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-11-07 16:42:50
-->
<template>
  <div :id="myId" class="ImgCtn">
    <div v-if="!loaded" class="imgCtn">
      <Error v-if="error" class="imgIcon" />
      <Loading v-else class="imgIcon" />
      <span v-text="error ? '图片加载失败' : '加载中...'" />
    </div>
    <img v-else :src="src" class="img" @click="imgDisplay" />
    <div v-if="desc" class="imgDesc" v-text="`▲${desc}`" />
  </div>
</template>
<script lang="ts">
import { remove } from "lodash";
import { Component, Prop, Vue } from "vue-property-decorator";
import Error from "|/icon/error.svg";
import Loading from "|/icon/loading.svg";

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

      // eslint-disable-next-line no-empty-function
      img.onload = () => {};
    };
  }

  private imgDisplay() {
    this.$store.commit("imageUrl", this.src);
  }
}
</script>
<style lang="stylus" scoped>
.ImgCtn
  display flex
  flex-direction column
  align-items center

.ImgCtn + .ImgCtn
  margin-top 8px

.imgIcon
  width 36px
  height 36px

.imgCtn
  width 96%
  height 60px
  display -webkit-flex
  display flex
  justify-content center
  align-items center
  margin 4px 2%
  border-radius 8px
  background-color #efeef4
  color #888
  max-width 560px !important

.img
  width 96%
  margin 4px 2%
  border-radius 8px
  max-width 560px !important

  @media (min-width 768px)
    margin-top 12px
    margin-bottom 12px

.P .img
  width 100%
  margin 4px 0

.imgDesc
  margin-top -2px
  margin-bottom 4px
  font-size 12px
  font-weight 300
  text-align center
  color #222
  letter-spacing 1px

  @media (min-width 768px)
    font-size 14px

.nm .imgDesc
  color #ddd
</style>
