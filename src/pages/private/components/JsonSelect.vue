<!--
 * @Author: Mr.Hope
 * @Date: 2019-06-03 12:19:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-25 23:39:30
 * @Description: JSON选择
-->
<template>
  <a-row>
    <!-- 上传文件 -->
    <a-col :md="8" :sm="24">
      <a-upload-dragger name="file">
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">上传文件</p>
        <p class="ant-upload-hint">点击或拖动文件到此处以上传</p>
      </a-upload-dragger>
    </a-col>

    <a-divider type="$store.state.sc">
      <span style="font-size:18px;">或</span>
    </a-divider>

    <!-- 新增文件 -->
    <a-col :md="8" :sm="24">
      <a-button @click="newJson" block icon="plus-square" size="large">新建</a-button>
    </a-col>

    <a-divider>
      <span style="font-size:18px;">或</span>
    </a-divider>

    <!-- 选择线上文件 -->
    <a-col :md="8" :sm="24">
      <a-button @click="online=true" block icon="plus-square" size="large">选择线上文件</a-button>
      <div class="jsonNameInputCtn" v-if="online">
        <a-input class="jsonNameInput" placeholder="请输入Json页面名称" v-model="jsonName" />
        <a-button @click="getOnlineJson" type="primary">获取</a-button>
      </div>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class JsonSelect extends Vue {

  private online = false;

  private jsonName = '';

  // 新建json文件
  private newJson() {
    this.$emit('json', '');
    this.$emit('next');
  }

  private getOnlineJson() {

  }
}
</script>
<style scoped>
.jsonNameInputCtn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.jsonNameInput {
  max-width: 160px;
  margin-right: 40px;
}
</style>
