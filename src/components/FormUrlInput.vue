<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-22 18:45:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-24 14:54:10
 * @Description: Form Url Input
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
    <!-- 真实的表单项 -->
    <a-input
      v-decorator="[
        `${index}-${config}`,
        {
          initialValue: 'https://',
          rules: [{
            required: configuration.required,
            type: prefix===''? 'string' :'url'
          }]
        }
      ]"
      v-show="false"
    />
    <!-- 渲染的表单项 -->
    <a-input v-model="path">
      <!-- 网址输入 -->
      <a-select
        :options="[
            { label:'https://', value: 'https://'},
            { label:'http://', value: 'http://'},
            { label:'无前缀', value: ''}
        ]"
        defaultValue="https://"
        slot="addonBefore"
        style="width: 90px"
        v-model="prefix"
      />
    </a-input>
  </a-form-item>
</template>
<script lang="ts">
import {
  Component, Inject, Prop, Vue, Watch
} from 'vue-property-decorator';
import { Config } from '@/views/private/JsonEditor.vue';

@Component
export default class FormUrlInput extends Vue {
  @Prop(Object) private configuration!: Config;

  @Prop(Number) private index!: number;

  @Prop(String) private config!: string;

  @Inject() private form!: any;

  private prefix = 'https://';

  private path = '';

  // 获得正确的url
  private get url() {
    return this.prefix + this.path;
  }

  // 当url改变时更新表单项
  @Watch('url')
  private onUrlChange(newValue: string) {
    this.form.setFieldsValue({ [`${this.index}-${this.config}`]: newValue });
  }

}
</script>
