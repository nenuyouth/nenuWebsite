<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-22 18:45:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-02 13:29:59
 * @Description: Form Url Input
-->
<template>
  <a-form-item v-bind="configuration.title ? labelCol : noLabelCol">
    <template v-if="configuration.title" #label>
      <!-- 表单项名称 -->
      {{ configuration.title }}
      <!-- 描述文字 -->
      <a-tooltip v-if="configuration.desc" :title="configuration.desc">
        <a-icon style="vertical-align: -0.125em" type="question-circle" />
      </a-tooltip>
    </template>
    <!-- 真实的表单项 -->
    <a-input
      v-decorator="[
        identifier,
        {
          rules: [
            {
              required: configuration.required,
              type: path ? (prefix === '' ? 'string' : 'url') : 'string',
            },
          ],
        },
      ]"
      type="hidden"
    />

    <!-- 渲染的表单项 -->
    <a-input v-model="path">
      <!-- 网址输入 -->
      <a-select
        slot="addonBefore"
        v-model="prefix"
        :options="[
          { label: 'https://', value: 'https://' },
          { label: 'http://', value: 'http://' },
          { label: '无前缀', value: '' },
        ]"
        default-value="https://"
        style="width: 90px"
      />
    </a-input>
  </a-form-item>
</template>
<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";
import { Config } from "%/pageConfig";

@Component
export default class FormUrlInput extends Vue {
  @Prop(Object) private readonly configuration!: Config;

  @Prop(String) private readonly identifier!: string;

  @Inject() private form!: any;

  private labelCol = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };

  private noLabelCol = { wrapperCol: { span: 24 } };

  private prefix = "https://";

  private path = "";

  // 获得正确的url
  private get url() {
    return this.path ? this.prefix + this.path : "";
  }

  // 当url改变时更新表单项
  @Watch("url")
  private onUrlChange(newValue: string) {
    this.form.setFieldsValue({ [this.identifier]: newValue });
  }
}
</script>
