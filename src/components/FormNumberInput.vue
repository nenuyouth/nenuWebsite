<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-22 18:45:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-22 19:38:11
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
    <a-input-number
      :step="configuration.step"
      style="width:150px;"
      v-decorator="[
        `${index}-${config}`,
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Config } from '@/views/private/JsonEditor.vue';

@Component
export default class FormNumberInput extends Vue {
  @Prop(Object) private configuration!: Config;

  @Prop(Number) private index!: number;

  @Prop(String) private config!: string;
}
</script>
