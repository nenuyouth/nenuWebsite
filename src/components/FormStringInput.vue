<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-22 18:45:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-22 19:38:02
 * @Description: Form String Input
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
    <a-input
      v-decorator="[
        `${index}-${config}`,
        {
          initialValue: configuration.default,
          rules: [{
            required: configuration.required,
            type: 'string'
          }]
        }
      ]"
    >
      <!-- 网址输入 -->
      <a-select
        :options="[
            { label:'https://', value: 'https://'},
            { label:'http://', value: 'http://'},
            { label:'无前缀', value: ''}
        ]"
        slot="addonBefore"
        style="width: 90px"
        v-decorator="[
          `${index}-${config}-prefix`,
          { initialValue: 'https://' }
        ]"
        v-if="configuration.url"
      />
    </a-input>
  </a-form-item>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Config } from '@/views/private/JsonEditor.vue';

@Component
export default class FormStringInput extends Vue {
  @Prop(Object) private configuration!: Config;

  @Prop(Number) private index!: number;

  @Prop(String) private config!: string;
}
</script>
