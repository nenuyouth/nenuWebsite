<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-24 18:39:40
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-24 20:38:56
 * @Description: Form Union Input
-->
<template>
  <!-- 复合类型 -->
  <a-form-item :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
    <template #label>
      <!-- 表单项名称 -->
      {{configuration.title}}
      <!-- 描述文字 -->
      <a-tooltip :title="configuration.desc" v-if="configuration.desc">
        <a-icon style="vertical-align:-0.125em;" type="question-circle"/>
      </a-tooltip>
    </template>
    <!-- 选择需要的值类型 -->
    <TypeSelect :option="configuration.type" v-model="typeSelect"/>

    <!-- 布尔值输入 -->
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
      v-if="typeSelect==='boolean'"
    />

    <!-- 数字输入 -->
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
      v-else-if="typeSelect==='number'"
    />

    <!-- 单行输入 -->
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
      v-else-if="typeSelect==='string'"
    />

    <!-- 多行输入 -->
    <a-textarea
      :autosize="{ minRows: 2 }"
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
      v-else-if="typeSelect==='mutiline'"
    />

    <!-- 网址输入 -->
    <template v-else-if="typeSelect==='url'">
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
    </template>
  </a-form-item>
</template>
<script lang="ts">
import {
  Component, Inject, Prop, Vue, Watch
} from 'vue-property-decorator';
import { Config } from '@/views/private/JsonEditor.vue';
import TypeSelect from '#/TypeSelect.vue';

@Component({ components: { TypeSelect } })
export default class FormUnionInput extends Vue {
  @Prop(Object) private configuration!: Config;

  @Prop(String) private identifier!: string;

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

  private typeSelect = '';
}
</script>
