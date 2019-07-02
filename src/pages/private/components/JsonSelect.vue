<!--
 * @Author: Mr.Hope
 * @Date: 2019-06-03 12:19:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-02 13:17:19
 * @Description: JSON选择
-->
<template>
  <div class="container">
    <a-upload-dragger name="file">
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox" />
        <!-- style="font-size:24px;"  -->
      </p>
      <p class="ant-upload-text">上传文件</p>
      <p class="ant-upload-hint">点击或拖动文件到此处以上传</p>
    </a-upload-dragger>
    <a-divider>
      <span style="font-size:18px;">或</span>
    </a-divider>
    <a-button icon="plus-square" size="large" block>新建</a-button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class JsonSelect extends Vue {
}
</script>
