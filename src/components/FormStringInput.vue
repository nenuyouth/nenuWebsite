<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-22 18:45:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-02 10:58:29
 * @Description: Form String Input
-->
<template>
  <a-form-item v-bind="configuration.title? labelCol: noLabelCol">
    <template #label v-if="configuration.title">
      <!-- 表单项名称 -->
      {{configuration.title}}
      <!-- 描述文字 -->
      <a-tooltip :title="configuration.desc" v-if="configuration.desc">
        <a-icon style="vertical-align:-0.125em;" type="question-circle" />
      </a-tooltip>
    </template>

    <!-- 类型选择插槽 -->
    <slot name="type-select" />

    <a-input
      v-decorator="[
        identifier,
        {
          initialValue: configuration.default,
          rules: [{
            required: configuration.required,
            type: 'string'
          }]
        }
      ]"
    />
  </a-form-item>
</template>
<script lang="ts">
import { Component, Inject, Prop, Vue } from 'vue-property-decorator';
import { Config } from '%/pageConfig';

@Component
export default class FormStringInput extends Vue {
  @Prop(Object) private readonly configuration!: Config;

  @Prop(String) private readonly identifier!: string;

  @Inject() private form!: any;

  private labelCol = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  private noLabelCol = { wrapperCol: { span: 24 } };

  private mounted() {
    this.form.getFieldDecorator(this.identifier, {
      initialValue: this.configuration.default,
      rules: [
        {
          required: this.configuration.required,
          type: 'string'
        }
      ]
    });
  }
}
</script>
