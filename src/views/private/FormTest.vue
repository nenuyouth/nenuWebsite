<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-19 17:25:48
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-22 17:44:34
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

            <!-- 多个列表 -->
            <template v-if="configuration[part][config].type==='array'">
              <a-form-item
                :key="`${partIndex}-${config}-${index}`"
                :required="index === 0"
                v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
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
              <a-form-item :key="`${partIndex}-${config}-add`" v-bind="formItemLayoutWithOutLabel">
                <a-button
                  @click="add(`${partIndex}-${config}-key`)"
                  style="width: 60%"
                  type="dashed"
                >
                  <a-icon type="plus"/>新增项
                </a-button>
              </a-form-item>
            </template>

            <!-- 单个列表 -->
            <a-form-item
              :key="`${partIndex}-${config}`"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              v-else
            >
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
                  autosize
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
                  v-else-if="configuration[part][config].type==='boolean'"
                />

                <!-- 多行输入 -->
                <a-textarea
                  autosize
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
                  v-else-if="configuration[part][config].type==='mutiline'"
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
                  v-else-if="configuration[part][config].type==='string'"
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
                        `${partIndex}-${config}-prefix`,
                        { initialValue: 'https://' }
                      ]"
                    v-if="configuration[part][config].url"
                  />
                </a-input>

                <!-- 数字输入 -->
                <a-input-number
                  :step="configuration[part][config].step"
                  style="width:150px;"
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
                  v-else-if="configuration[part][config].type==='number'"
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
        <a-button html-type="submit" type="primary">Submit</a-button>
      </a-form-item>
    </a-form>
    <div>
      <a-button @click="addComponent" class="addNewBtn" type="primary">
        <a-icon type="plus"/>新增
      </a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import DropdownTitle from '#/DropdownTitle.vue';
import TypeSelect from '#/TypeSelect.vue';

interface UnionTypeItem {
  [props: string]: string;
}

interface Configuration {
  readonly [propName: string]: {
    [propName: string]: {
      title: string;
      desc?: string;
      type: string | string[];
      required: boolean;
      default?: any;
      enum?: any[];
      element?: string[] | string;
      step?: number;
    };
  };
}

interface NormalObject {
  [propName: string]: any;
}

let id = 0;

@Component({ components: { DropdownTitle, TypeSelect } })
export default class FormTest extends Vue {
  private formLayout = 'horizontal';

  private form: any;

  private formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 }
    }
  };

  private formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 }
    }
  };

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
    const nextKeys = keys.concat(++id);
    // can use data-binding to set

    // important! notify form to detect changes
    this.form.setFieldsValue({ [formKey]: nextKeys });
  }

  private beforeCreate() {
    this.form = this.$form.createForm(this);
    // this.form.getFieldDecorator('keys', { initialValue: [], preserve: true });
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      if (!err) console.log('Received values of form: ', values);
    });

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
          if (originKeyValue) json[index][key] = value as string + originKeyValue;
          else formValue[originKey] = value as string + formValue[originKey] as string;
        else if (additional === 'suffix')
          if (originKeyValue) json[index][key] += value;
          else formValue[originKey] += value;
      }

      // 保证value有定义且不为默认值
      if (typeof value !== 'undefined' && value !== this.configuration[json[index].tag][key].default)
        json[index][key] = value;
    });

    console.log(json);
    console.log(JSON.stringify(json));
  }

  private handleSelectChange(value: any) {
    this.form.setFieldsValue({ note: `Hi, ${value === 'male' ? 'man' : 'lady'}!` });
  }

  private pageJson: any[] = [];

  private tagList = require('|/JsonEditor/tagList');

  private tags: string[] = ['head'];

  private unionTypeSelect: UnionTypeItem[] = [{}];

  private configuration = require('|/JsonEditor/jsonConfig');

  // Add a new component in the end
  private addComponent() {
    this.tags.push('请选择');
    this.unionTypeSelect.push({});
  }

  private tagChange(partIndex: number) {
    const currentTag = this.tags[partIndex];

    // check if the tag config has any array-type option
    const currentTagConfig = this.configuration[currentTag];

    Object.keys(currentTagConfig).forEach(config => {
      if (currentTagConfig[config].type === 'array')
        this.form.getFieldDecorator(`${partIndex}-${config}-key`, { initialValue: [], preserve: true });
    });
  }
}
</script>
<style scoped>
.addNewBtn {
  border-radius: 16px;
}
</style>
