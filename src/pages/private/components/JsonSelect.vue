<!--
 * @Author: Mr.Hope
 * @Date: 2019-06-03 12:19:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-07 16:13:15
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
      <a-button block icon="plus-square" size="large" @click="newJson">新建</a-button>
    </a-col>

    <a-divider>
      <span style="font-size:18px;">或</span>
    </a-divider>

    <!-- 选择线上文件 -->
    <a-col :md="8" :sm="24">
      <a-button block icon="plus-square" size="large" @click="online=true">选择线上文件</a-button>
      <div v-if="online" class="jsonNameInputCtn">
        <a-input v-model="jsonName" class="jsonNameInput" placeholder="请输入Json页面名称" />
        <a-button type="primary" @click="getOnlineJson">获取</a-button>
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
    // do something
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
