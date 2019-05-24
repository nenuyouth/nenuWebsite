<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-19 17:25:48
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-24 15:01:13
 * @Description: 测试
-->
<template>
  <div class="container">
    <a-form :form="form" @submit="handleSubmit">
      <template v-for="(part,partIndex) in tags">
        <!-- 循环pageJson -->

        <!-- 带有分割线、下拉列表的标题 -->
        <DropdownTitle
          :key="partIndex"
          :menu="tagList"
          :onChange="tagChange(partIndex)"
          v-model="tags[partIndex]"
        />

        <!-- 选项列表 -->
        <template v-if="part!=='请选择'">
          <template v-for="config in Object.keys(configuration[part])">
            <!-- 每个选项设置 -->

            <!-- 布尔值输入 -->
            <form-boolean-input
              :config="config"
              :configuration="configuration[part][config]"
              :index="partIndex"
              :key="`${partIndex}-${config}`"
              v-if="configuration[part][config].type==='boolean'"
            />

            <!-- 数字输入 -->
            <form-number-input
              :config="config"
              :configuration="configuration[part][config]"
              :index="partIndex"
              :key="`${partIndex}-${config}`"
              v-else-if="configuration[part][config].type==='number'"
            />

            <!-- 单行输入 -->
            <form-string-input
              :config="config"
              :configuration="configuration[part][config]"
              :index="partIndex"
              :key="`${partIndex}-${config}`"
              v-else-if="configuration[part][config].type==='string'"
            />

            <!-- 单行输入 -->
            <form-url-input
              :config="config"
              :configuration="configuration[part][config]"
              :index="partIndex"
              :key="`${partIndex}-${config}`"
              v-else-if="configuration[part][config].type==='url'"
            />

            <!-- 多行输入 -->
            <form-textarea-input
              :config="config"
              :configuration="configuration[part][config]"
              :index="partIndex"
              :key="`${partIndex}-${config}`"
              v-else-if="configuration[part][config].type==='mutiline'"
            />

            <!-- 列表 -->
            <template v-else-if="configuration[part][config].type==='array'">
              <a-form-item
                :key="`${partIndex}-${config}-${index}`"
                :required="index === 0"
                v-bind="index === 0 ? LabelLayout : noLabelLayout"
                v-for="(item, index) in form.getFieldValue(`${partIndex}-${config}-key`)"
              >
                <template #label v-if="index === 0">
                  <!-- 表单项名称 -->
                  {{configuration[part][config].title}}
                  <!-- 描述文字 -->
                  <a-tooltip
                    :title="configuration[part][config].desc"
                    v-if="configuration[part][config].desc"
                  >
                    <a-icon style="vertical-align:-0.125em;" type="question-circle"/>
                  </a-tooltip>
                </template>
                <a-input
                  style="width: 60%; margin-right: 8px"
                  v-decorator="[
                    `${partIndex}-${config}[${index}]`,
                    {
                      validateTrigger: ['change', 'blur'],
                      preserve: true,
                      rules: [{
                          required: true,
                          type: configuration[part][config].element,
                          whitespace: true,
                          message: 'Please fill this item some value or delete this field.',
                      }]
                    }
                  ]"
                />
                <a-icon
                  :disabled="form.getFieldValue(`${partIndex}-${config}-key`).length === 1"
                  @click="() => remove(index,`${partIndex}-${config}-key`)"
                  class="dynamic-delete-button"
                  type="minus-circle-o"
                  v-if="form.getFieldValue(`${partIndex}-${config}-key`).length > 1"
                />
              </a-form-item>
              <a-form-item :key="`${partIndex}-${config}-add`" v-bind="noLabelLayout">
                <a-button @click="add(`${partIndex}-${config}-key`)">
                  <a-icon type="plus"/>新增项
                </a-button>
              </a-form-item>
            </template>

            <!-- 单个列表 -->
            <a-form-item :key="`${partIndex}-${config}`" v-bind="LabelLayout" v-else>
              <template #label>
                <!-- 表单项名称 -->
                {{configuration[part][config].title}}
                <!-- 描述文字 -->
                <a-tooltip
                  :title="configuration[part][config].desc"
                  v-if="configuration[part][config].desc"
                >
                  <a-icon style="vertical-align:-0.125em;" type="question-circle"/>
                </a-tooltip>
              </template>

              <!-- 复合类型 -->
              <template v-if="typeof configuration[part][config].type==='object'">
                <!-- 选择需要的值类型 -->
                <TypeSelect
                  :option="configuration[part][config].type"
                  v-model="unionTypeSelect[partIndex][config]"
                />

                <!-- 布尔值输入 -->
                <a-radio-group
                  :name="`${partIndex}-${config}`"
                  :options=" [{ label: 'True', value: true }, { label: 'False', value: false }]"
                  v-decorator="[
                    `${partIndex}-${config}`,
                    {
                      initialValue: configuration[part][config].default,
                      rules: [{
                        required: configuration[part][config].required,
                        type: 'boolean'
                      }]
                    }
                  ]"
                  v-if="unionTypeSelect[partIndex][config]==='boolean'"
                />

                <!-- 多行输入 -->
                <a-textarea
                  :autosize="{ minRows: 2 }"
                  v-decorator="[
                    `${partIndex}-${config}`,
                    {
                      initialValue: configuration[part][config].default,
                      rules: [{
                        required: configuration[part][config].required,
                        type: 'string'
                      }]
                    }
                  ]"
                  v-else-if="unionTypeSelect[partIndex][config]==='mutiline'"
                />

                <!-- 单行输入 -->
                <a-input
                  v-decorator="[
                    `${partIndex}-${config}`,
                    {
                      initialValue: configuration[part][config].default,
                      rules: [{
                        required: configuration[part][config].required,
                        type: 'string'
                      }]
                    }
                  ]"
                  v-else-if="unionTypeSelect[partIndex][config]==='string'"
                />

                <!-- 数字输入 -->
                <a-input-number
                  :step="configuration[part][config].step"
                  v-decorator="[
                    `${partIndex}-${config}`,
                    {
                      initialValue: configuration[part][config].default,
                      rules: [{
                        required: configuration[part][config].required,
                        type: 'number'
                      }]
                    }
                  ]"
                  v-else-if="unionTypeSelect[partIndex][config]==='number'"
                />
              </template>

              <!-- 简单类型 -->
              <template v-else>
                <!-- 可遍历值输入 -->
                <a-radio-group
                  :name="`${partIndex}-${config}`"
                  :options="configuration[part][config].enum"
                  v-decorator="[
                    `${partIndex}-${config}`,
                    {
                      initialValue: configuration[part][config].default,
                      rules: [{
                        required: configuration[part][config].required,
                        type: configuration[part][config].type,
                        enum: configuration[part][config].enum
                      }]
                    }
                  ]"
                  v-if="configuration[part][config].enum"
                />

                <!-- 对象输入 -->
                <a-input
                  v-decorator="[
                    `${partIndex}-${config}`,
                    {
                      initialValue: configuration[part][config].default,
                      rules: [{
                        required: configuration[part][config].required,
                        type: 'string'
                      }]
                    }
                  ]"
                  v-else-if="configuration[part][config].type==='object'"
                />
                <!-- 完善中... -->
              </template>
            </a-form-item>
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
import {
  Component, Prop, Provide, Vue, Watch
} from 'vue-property-decorator';
import DropdownTitle from '#/DropdownTitle.vue';
import TypeSelect from '#/TypeSelect.vue';
import FormBooleanInput from '#/FormBooleanInput.vue';
import FormNumberInput from '#/FormNumberInput.vue';
import FormStringInput from '#/FormStringInput.vue';
import FormTextareaInput from '#/FormTextareaInput.vue';
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

let id = 0;

@Component({
  components: {
    DropdownTitle,
    FormBooleanInput,
    FormNumberInput,
    FormStringInput,
    FormTextareaInput,
    FormUrlInput,
    TypeSelect
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

  // @Provide() public form = this.form;

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  private remove(index: number, formKey: string) {
    // can use data-binding to get
    const keys = this.form.getFieldValue(formKey);

    // We need at least one item
    if (keys.length === 1) return;

    // can use data-binding to set
    this.form.setFieldsValue({ [formKey]: keys.filter((key: number) => key !== index) });
  }

  private add(formKey: string) {
    // can use data-binding to get
    const keys = this.form.getFieldValue(formKey);

    id += 1;
    const nextKeys = keys.concat(id);
    // can use data-binding to set

    // important! notify form to detect changes
    this.form.setFieldsValue({ [formKey]: nextKeys });
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

          // 对additional类型做处理
          if (additional) {
            const originKeyValue: string = json[index][key];
            const originKey = `${indexString}-${key}`;

            if (additional === 'prefix')
              if (originKeyValue) json[index][key] = `${value}${originKeyValue}`;
              else formValue[originKey] = `${value}${formValue[originKey]}`;
            else if (additional === 'suffix')
              if (originKeyValue) json[index][key] += value;
              else formValue[originKey] += value;

            // 保证value有定义且不为默认值
          } else if (typeof value !== 'undefined' && value !== this.configuration[json[index].tag][key].default)
            json[index][key] = value;
        });

        console.log(json, JSON.stringify(json));
      }
    });
  }

  // Add a new component in the end
  private addComponent() {
    this.tags.push('请选择');
    // change uniontype length
    this.unionTypeSelect.push({});
  }

  // check if the tag config has any array-type option
  private tagChange(partIndex: number) {
    const currentTag = this.tags[partIndex];

    if (currentTag !== '请选择') {
      const currentTagConfig = this.configuration[currentTag];

      Object.keys(currentTagConfig).forEach(config => {
        if (currentTagConfig[config].type === 'array')
          this.form.getFieldDecorator(`${partIndex}-${config}-key`, { initialValue: [], preserve: true, rules: { type: 'array' } });
      });
    }

  }
}
</script>
<style scoped>
.addNewBtn {
  border-radius: 16px;
}
</style>
