<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-22 18:45:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-02 11:51:52
 * @Description: Form Object Input
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

    <!-- 类型选择插槽 -->
    <slot name="type-select" />

    <div>
      <span style="margin-right: 8px" v-text="objectValue || '对象为空'" />
      <a-button
        icon="edit"
        shape="circle"
        size="small"
        type="primary"
        @click="modelDisplay = true"
      />
    </div>

    <!-- 对象输入框 -->
    <a-modal
      :closable="false"
      :destroy-on-close="false"
      :keyboard="false"
      :mask-closable="false"
      :title="identifier.split('-')[1]"
      :visible="modelDisplay"
    >
      <template v-for="config in Object.keys(configuration.objectDetail)">
        <!-- 每个选项设置 -->
        <form-input
          :key="config"
          :configuration="configuration.objectDetail[config]"
          :identifier="`${identifier}[${config}]`"
        />
      </template>
      <!-- 自定义对话框按钮 -->
      <template #footer>
        <a-button
          key="submit"
          type="primary"
          @click="validate"
          v-text="'确定'"
        />
        <a-button
          type="primary"
          @click="modelDisplay = false"
          v-text="'取消'"
        />
      </template>
    </a-modal>
  </a-form-item>
</template>
<script lang="ts">
import { Component, Inject, Prop, Vue } from "vue-property-decorator";
import { Config } from "%/pageConfig";
import FormInput from "#/FormInput.vue";

interface NormalObject {
  [propName: string]: any;
}

interface ConfigwithIndex extends Config {
  [propName: string]: any;
}

@Component({ components: { FormInput } })
export default class FormObjectInput extends Vue {
  @Prop(Object) private configuration!: ConfigwithIndex;

  @Prop(String) private identifier!: string;

  @Inject() private form!: any;

  private labelCol = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };

  private noLabelCol = { wrapperCol: { span: 24 } };

  private modelDisplay = false;

  private objectValue = "";

  private validate(e: Event) {
    e.preventDefault();

    const value = this.form.getFieldValue(this.identifier);
    const objectValue: NormalObject = {};

    Object.keys(value).forEach((key) => {
      objectValue[key] = value[key];
    });

    this.objectValue = JSON.stringify(objectValue);
    this.modelDisplay = false;
  }
}
</script>
