<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-22 18:45:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-01 22:59:36
 * @Description: Form Url Input
-->
<template>
  <a-form-item :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
    <template #label>
      <!-- 表单项名称 -->
      {{configuration.title}}
      <!-- 描述文字 -->
      <a-tooltip :title="configuration.desc" v-if="configuration.desc">
        <a-icon style="vertical-align:-0.125em;" type="question-circle" />
      </a-tooltip>
    </template>
    <!-- 真实的表单项 -->
    <a-input
      v-decorator="[
        identifier,
        {
          rules: [{
            required: configuration.required,
            type: path ? prefix==='' ? 'string' :'url' :'string'
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
import { Config } from '%/pageConfig';

@Component
export default class FormUrlInput extends Vue {
  @Prop(Object) private readonly configuration!: Config;

  @Prop(String) private readonly identifier!: string;

  @Inject() private form!: any;

  private prefix = 'https://';

  private path = '';

  // 获得正确的url
  private get url() {
    return this.path ? this.prefix + this.path : '';
  }

  // 当url改变时更新表单项
  @Watch('url')
  private onUrlChange(newValue: string) {
    this.form.setFieldsValue({ [this.identifier]: newValue });
  }

}
</script>
