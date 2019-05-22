<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-22 18:45:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-22 19:23:30
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
      :name="`${index}-${config}`"
      :options=" [{ label: 'True', value: true }, { label: 'False', value: false }]"
      v-decorator="[
      `${index}-${config}`,
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

  @Prop(Number) private index!: number;

  @Prop(String) private config!: string;
}
</script>
