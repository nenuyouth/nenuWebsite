<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-22 18:45:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-26 20:38:33
 * @Description: Form Number Input
-->
<template>
  <a-form-item :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
    <template #label>
      <!-- 表单项名称 -->
      {{configuration.title}}
      <!-- 描述文字 -->
      <a-tooltip :title="configuration.desc" v-if="configuration.desc">
        <a-icon style="vertical-align:-0.125em;" type="question-circle"/>
      </a-tooltip>
    </template>

    <!-- 类型选择插槽 -->
    <slot name="type-select"/>

    <a-input-number
      :step="configuration.step"
      style="width:150px;"
      v-decorator="[
        identifier,
        {
          initialValue: configuration.default,
          rules: [{
            required: configuration.required,
            type: 'number'
          }]
        }
      ]"
    />
  </a-form-item>
</template>
<script lang="ts">
import { Component, Inject, Prop, Vue } from 'vue-property-decorator';
import { Config } from '@/views/private/JsonEditor.vue';

@Component
export default class FormNumberInput extends Vue {
  @Prop(Object) private configuration!: Config;

  @Prop(String) private identifier!: string;

  @Inject() private form!: any;

  private mounted() {
    this.form.getFieldDecorator(this.identifier, {
      initialValue: this.configuration.default,
      rules: [
        {
          required: this.configuration.required,
          type: 'number'
        }
      ]
    });
  }
}
</script>
