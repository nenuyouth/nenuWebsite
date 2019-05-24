<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-22 18:45:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-24 17:39:52
 * @Description: Form Boolean Input
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
    <a-radio-group
      :name="identifier"
      :options=" [{ label: 'True', value: true }, { label: 'False', value: false }]"
      v-decorator="[
        identifier,
        {
          initialValue: configuration.default,
          rules: [{
            required: configuration.required,
            type: 'boolean'
          }]
        }
    ]"
    />
  </a-form-item>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Config } from '@/views/private/JsonEditor.vue';

@Component
export default class FormBooleanInput extends Vue {
  @Prop(Object) private configuration!: Config;

  @Prop(String) private identifier!: string;
}
</script>
