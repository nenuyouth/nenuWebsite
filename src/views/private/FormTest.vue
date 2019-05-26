<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-19 17:25:48
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-25 16:18:16
 * @Description: 测试
-->
<template>
  <div class="container">
    <a-form :form="form" @submit="handleSubmit">
      <template v-for="(part,partIndex) in tags">
        <!-- 循环pageJson -->

        <!-- 带有分割线、下拉列表的标题 -->
        <DropdownTitle :key="partIndex" :menu="tagList" v-model="tags[partIndex]"/>

        <!-- 选项列表 -->
        <template v-if="part!=='请选择'">
          <template v-for="config in Object.keys(configuration[part])">
            <!-- 每个选项设置 -->

            <!-- 联合类型输入 -->
            <form-union-input
              :configuration="configuration[part][config]"
              :identifier="`${partIndex}-${config}`"
              :key="`${partIndex}-${config}`"
              v-if="typeof configuration[part][config].type==='object'"
            />

            <!-- 可遍历值输入 -->
            <form-enum-input
              :configuration="configuration[part][config]"
              :identifier="`${partIndex}-${config}`"
              :key="`${partIndex}-${config}`"
              v-else-if="configuration[part][config].enum"
            />

            <!-- 布尔值输入 -->
            <form-boolean-input
              :configuration="configuration[part][config]"
              :identifier="`${partIndex}-${config}`"
              :key="`${partIndex}-${config}`"
              v-else-if="configuration[part][config].type==='boolean'"
            />

            <!-- 数字输入 -->
            <form-number-input
              :configuration="configuration[part][config]"
              :identifier="`${partIndex}-${config}`"
              :key="`${partIndex}-${config}`"
              v-else-if="configuration[part][config].type==='number'"
            />

            <!-- 单行输入 -->
            <form-string-input
              :configuration="configuration[part][config]"
              :identifier="`${partIndex}-${config}`"
              :key="`${partIndex}-${config}`"
              v-else-if="configuration[part][config].type==='string'"
            />

            <!-- 网址输入 -->
            <form-url-input
              :configuration="configuration[part][config]"
              :identifier="`${partIndex}-${config}`"
              :key="`${partIndex}-${config}`"
              v-else-if="configuration[part][config].type==='url'"
            />

            <!-- 多行输入 -->
            <form-textarea-input
              :configuration="configuration[part][config]"
              :identifier="`${partIndex}-${config}`"
              :key="`${partIndex}-${config}`"
              v-else-if="configuration[part][config].type==='mutiline'"
            />

            <!-- 数组输入 -->
            <form-array-input
              :configuration="configuration[part][config]"
              :identifier="`${partIndex}-${config}`"
              :key="`${partIndex}-${config}`"
              v-else-if="configuration[part][config].type==='array'"
            />
          </template>
        </template>
      </template>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button @click="addComponent" class="addNewBtn" type="primary">
          <a-icon type="plus"/>新增
        </a-button>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button html-type="submit" type="primary">检查JSON文件</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Provide, Vue } from 'vue-property-decorator';
import DropdownTitle from '#/DropdownTitle.vue';
import FormArrayInput from '#/FormArrayInput.vue';
import FormBooleanInput from '#/FormBooleanInput.vue';
import FormEnumInput from '#/FormEnumInput.vue';
import FormNumberInput from '#/FormNumberInput.vue';
import FormStringInput from '#/FormStringInput.vue';
import FormTextareaInput from '#/FormTextareaInput.vue';
import FormUnionInput from '#/FormUnionInput.1.vue';
import FormUrlInput from '#/FormUrlInput.vue';

interface UnionTypeItem {
  [props: string]: string;
}

export interface Config {
  title: string;
  desc?: string;
  type: string | string[];
  required: boolean;
  default?: any;
  enum?: any[];
  element?: string[] | string;
  step?: number;
}

interface Configuration {
  readonly [propName: string]: {
    [propName: string]: Config;
  };
}

interface NormalObject {
  [propName: string]: any;
}

@Component({
  components: {
    DropdownTitle,
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
export default class FormTest extends Vue {
  @Provide() private form: any;

  // Form Layout
  private LabelLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  private noLabelLayout = { wrapperCol: { span: 18, offset: 6 } };

  private pageJson: any[] = [];

  private tags: string[] = ['head'];

  private unionTypeSelect: UnionTypeItem[] = [{}];

  private get configuration() {
    const configuration: Configuration = require('|/JsonEditor/jsonConfig');

    return configuration;
  }

  private get tagList() {
    const tagList: string[][] = require('|/JsonEditor/tagList');

    return tagList;
  }

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const json: NormalObject[] = [];
        const formValue = this.form.getFieldsValue();

        this.tags.forEach(tag => {
          json.push({ tag });
        });

        Object.keys(formValue).forEach(x => {
          const [indexString, key, additional] = x.split('-');
          const index = Number(indexString);
          const value = formValue[x];

          // 保证value有定义且不为默认值
          if (!additional && typeof value !== 'undefined' && value !== this.configuration[json[index].tag][key].default)
            json[index][key] = value;
        });

        console.log(json, JSON.stringify(json));
      }
    });
  }

  // Add a new component in the end
  private addComponent() {
    this.tags.push('请选择');
  }
}
</script>
<style scoped>
.addNewBtn {
  border-radius: 16px;
}
</style>
