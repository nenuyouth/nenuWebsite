<!--
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Base Image
 * @Date: 2019-02-27 00:00:08
 * @LastEditTime: 2019-08-25 21:11:18
-->
<template>
  <div :id="myId" class="ImgCtn">
    <div class="imgCtn" v-if="!loaded">
      <Error class="imgIcon" v-if="error" />
      <Loading class="imgIcon" v-else />
      <span v-text="error ? '图片加载失败' : '加载中...'" />
    </div>
    <img :src="src" @click="imgDisplay" class="img" v-else />
    <div class="imgDesc" v-if="desc" v-text="`▲${desc}`" />
  </div>
</template>
<script lang="ts">
import { createComponent, onMounted, ref } from '@vue/composition-api';
import Loading from '|/icon/loading.svg';
import Error from '|/icon/error.svg';

export default createComponent({
  name: 'BaseImg',
  props: {
    // Component ID
    myId: Number,
    // Image link address
    src: { type: String, required: true },
    // Image description
    desc: String
  },
  components: {
    Loading,
    Error
  },
  setup(props, context) {

    // Image load status
    const loaded = ref(false);
    const error = ref(false);

    const imgDisplay = () => {
      context.root.$store.commit('imageUrl', props.src);
    };

    onMounted(() => {
      const img = new Image(); // Create new Image instance

      img.src = props.src as unknown as string;

      // Image has been cached
      if (img.complete) {
        loaded.value = true;

        return;
      }

      // Error when loading Image, show error message
      img.onerror = () => {
        error.value = true;
      };

      // Sucess loading Image, display this Image now
      img.onload = () => {
        loaded.value = true;

        delete img.onload;
      };
    });

    return {
      loaded,
      error,
      imgDisplay
    };
  }
});
</script>
<style lang='scss' scoped>
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
  width: 96%;
  margin: 4px 2%;
  border-radius: 8px;
  max-width: 560px !important;
  @media (min-width: 768px) {
    margin-top: 12px;
    margin-bottom: 12px;
  }
}

.P .img {
  width: 100%;
  margin: 4px 0;
}

.imgDesc {
  margin-top: -2px;
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  color: #222;
  letter-spacing: 1px;
  @media (min-width: 768px) {
    font-size: 14px;
  }
}

.nm .imgDesc {
  color: #ddd;
}
</style>
