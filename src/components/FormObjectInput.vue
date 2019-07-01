<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-22 18:45:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-02 00:12:50
 * @Description: Form Object Input
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

    <!-- 类型选择插槽 -->
    <slot name="type-select" />

    <div>
      <span style="margin-right:8px;" v-text="objectValue||'对象为空'" />
      <a-button @click="modelDisplay=true" icon="edit" shape="circle" size="small" type="primary" />
    </div>

    <!-- 真实的表单项 -->
    <a-input
      type="hidden"
      v-decorator="[
        `${identifier}-object`,
        {
          rules: [{
            required: configuration.required
          }]
        }
      ]"
    />

    <!-- 对象输入框 -->
    <a-modal
      :closable="false"
      :destroyOnClose="false"
      :keyboard="false"
      :maskClosable="false"
      :title="identifier.split('-')[1]"
      :visible="modelDisplay"
    >
      <a-form :form="form" @submit="validate">
        <template v-for="config in Object.keys(configuration.objectDetail)">
          <!-- 每个选项设置 -->

          <!-- 联合类型输入 -->
          <form-union-input
            :configuration="configuration.objectDetail[config]"
            :identifier="config"
            :key="config"
            v-if="typeof configuration.objectDetail[config].type==='object'"
          />

          <!-- 可遍历值输入 -->
          <form-enum-input
            :configuration="configuration.objectDetail[config]"
            :identifier="config"
            :key="config"
            v-else-if="configuration.objectDetail[config].enum"
          />

          <!-- 布尔值输入 -->
          <form-boolean-input
            :configuration="configuration.objectDetail[config]"
            :identifier="config"
            :key="config"
            v-else-if="configuration.objectDetail[config].type==='boolean'"
          />

          <!-- 数字输入 -->
          <form-number-input
            :configuration="configuration.objectDetail[config]"
            :identifier="config"
            :key="config"
            v-else-if="configuration.objectDetail[config].type==='number'"
          />

          <!-- 单行输入 -->
          <form-string-input
            :configuration="configuration.objectDetail[config]"
            :identifier="config"
            :key="config"
            v-else-if="configuration.objectDetail[config].type==='string'"
          />

          <!-- 网址输入 -->
          <form-url-input
            :configuration="configuration.objectDetail[config]"
            :identifier="config"
            :key="config"
            v-else-if="configuration.objectDetail[config].type==='url'"
          />

          <!-- 多行输入 -->
          <form-textarea-input
            :configuration="configuration.objectDetail[config]"
            :identifier="config"
            :key="config"
            v-else-if="configuration.objectDetail[config].type==='mutiline'"
          />

          <!-- 数组输入 -->
          <form-array-input
            :configuration="configuration.objectDetail[config]"
            :identifier="config"
            :key="config"
            v-else-if="configuration.objectDetail[config].type==='array'"
          />
        </template>
      </a-form>
      <!-- 自定义对话框按钮 -->
      <template #footer>
        <a-button @click="validate" key="submit" type="primary" v-text="'确定'" />
        <a-button @click="modelDisplay=false" type="primary" v-text="'取消'" />
      </template>
    </a-modal>
  </a-form-item>
</template>
<script lang="ts">
import {
  Component, Inject, Prop, Provide, Vue
} from 'vue-property-decorator';
import { Config } from '%/pageConfig';
import FormArrayInput from '#/FormArrayInput.vue';
import FormBooleanInput from '#/FormBooleanInput.vue';
import FormEnumInput from '#/FormEnumInput.vue';
import FormNumberInput from '#/FormNumberInput.vue';
import FormStringInput from '#/FormStringInput.vue';
import FormTextareaInput from '#/FormTextareaInput.vue';
import FormUnionInput from '#/FormUnionInput.vue';
import FormUrlInput from '#/FormUrlInput.vue';

interface NormalObject {
  [propName: string]: any;
}

interface ConfigwithIndex extends Config {
  [propName: string]: any;
}

@Component({
  components: {
    FormArrayInput,
    FormBooleanInput,
    FormEnumInput,
    FormNumberInput,
    FormStringInput,
    FormTextareaInput,
    FormUnionInput,
    FormUrlInput
  }
})
export default class FormObjectInput extends Vue {
  @Prop(Object) private configuration!: ConfigwithIndex;

  @Prop(String) private identifier!: string;

  @Inject({ from: 'form' }) private parrentForm!: any;

  @Provide() form: any;

  private modelDisplay = false;

  private objectValue = '';

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  private validate(e: Event) {
    e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const formValue = this.form.getFieldsValue();
        const objectValue: NormalObject = {};

        console.log(formValue);
        Object.keys(formValue).forEach(x => {
          const [key, additional] = x.split('-');
          const value = formValue[x];

          console.log(key, additional, value);
          // 保证value有定义且不为默认值
          if (!additional && typeof value !== 'undefined' && value !== this.configuration.objectDetail[key].default)
            objectValue[x] = value;
        });

        console.log(objectValue);

        this.objectValue = JSON.stringify(objectValue);
        this.parrentForm.setFieldsValue({ [`${this.identifier}-object`]: this.objectValue });
        this.modelDisplay = false;
      }
    });
  }
}
</script>
