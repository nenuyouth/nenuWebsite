<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-22 18:45:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-02 00:15:19
 * @Description: Form Object Input
-->
<template>
  <div>
    <!-- 列表 -->
    <a-form-item
      :key="`${identifier}-${index}`"
      :required="index === 0"
      v-bind="index === 0 ? LabelLayout : noLabelLayout"
      v-for="(item, index) in length"
    >
      <template #label v-if="index === 0">
        <!-- 表单项名称 -->
        {{configuration.title}}
        <!-- 描述文字 -->
        <a-tooltip :title="configuration.desc" v-if="configuration.desc">
          <a-icon style="vertical-align:-0.125em;" type="question-circle" />
        </a-tooltip>
      </template>

      <a-input
        type="hidden"
        v-decorator="[
          `${identifier}[${index}]`,
          {
            validateTrigger: ['change', 'blur'],
            preserve: true,
            rules: [{
                required: configuration.required,
                type: configuration.element,
                message: '请补充此项或将此项删除'
            }]
          }
        ]"
      />

      <div>
        <span style="margin-right:8px;" v-text="objectValue||'对象为空'" />
        <a-button
          @click="modelDisplay=true"
          icon="edit"
          shape="circle"
          size="small"
          style="margin-right:8px;"
          type="primary"
        />
        <a-button
          @click="remove(index)"
          icon="minus"
          shape="circle"
          size="small"
          v-if="length > 1"
        />
      </div>

      <!-- 对象输入框 -->
      <a-modal
        :closable="false"
        :destroyOnClose="false"
        :keyboard="false"
        :maskClosable="false"
        :title="identifier.split('-')[1]"
        :visible="modelDisplay"
      >
        <a-form :form="objectForm[index]" @submit="validate">
          <template v-for="config in Object.keys(configuration.objectDetail)">
            <!-- 每个选项设置 -->
            <form-input
              :configuration="configuration.objectDetail[config]"
              :identifier="config"
              :key="config"
            />
            <!-- 联合类型输入 -->
            <!-- <form-union-input
              :configuration="configuration.objectDetail[config]"
              :identifier="config"
              :key="config"
              v-if="typeof configuration.objectDetail[config].type==='object'"
            />-->

            <!-- 可遍历值输入 -->
            <!-- <form-enum-input
              :configuration="configuration.objectDetail[config]"
              :identifier="config"
              :key="config"
              v-else-if="configuration.objectDetail[config].enum"
            />-->

            <!-- 布尔值输入 -->
            <!-- <form-boolean-input
              :configuration="configuration.objectDetail[config]"
              :identifier="config"
              :key="config"
              v-else-if="configuration.objectDetail[config].type==='boolean'"
            />-->

            <!-- 数字输入 -->
            <!-- <form-number-input
              :configuration="configuration.objectDetail[config]"
              :identifier="config"
              :key="config"
              v-else-if="configuration.objectDetail[config].type==='number'"
            />-->

            <!-- 单行输入 -->
            <!-- <form-string-input
              :configuration="configuration.objectDetail[config]"
              :identifier="config"
              :key="config"
              v-else-if="configuration.objectDetail[config].type==='string'"
            />-->

            <!-- 网址输入 -->
            <!-- <form-url-input
              :configuration="configuration.objectDetail[config]"
              :identifier="config"
              :key="config"
              v-else-if="configuration.objectDetail[config].type==='url'"
            />-->

            <!-- 多行输入 -->
            <!-- <form-textarea-input
              :configuration="configuration.objectDetail[config]"
              :identifier="config"
              :key="config"
              v-else-if="configuration.objectDetail[config].type==='mutiline'"
            />-->

            <!-- 数组输入 -->
            <!-- <form-array-input
              :configuration="configuration.objectDetail[config]"
              :identifier="config"
              :key="config"
              v-else-if="configuration.objectDetail[config].type==='array'"
            />-->
          </template>
        </a-form>
        <!-- 自定义对话框按钮 -->
        <template #footer>
          <a-button @click="validate(index,$event)" key="submit" type="primary" v-text="'确定'" />
          <a-button @click="modelDisplay=false" type="primary" v-text="'取消'" />
        </template>
      </a-modal>
    </a-form-item>
    <a-form-item :key="`${identifier}-add`" v-bind="noLabelLayout">
      <a-button @click="add" style="border-radius: 16px;">
        <a-icon type="plus" />新增项
      </a-button>
    </a-form-item>
  </div>
</template>
<script lang="ts">
import {
  Component, Inject, Prop, Provide, Vue
} from 'vue-property-decorator';
import { Config } from '%/pageConfig';
// import FormArrayInput from '#/FormArrayInput.vue';
// import FormBooleanInput from '#/FormBooleanInput.vue';
// import FormEnumInput from '#/FormEnumInput.vue';
// import FormNumberInput from '#/FormNumberInput.vue';
// import FormStringInput from '#/FormStringInput.vue';
// import FormTextareaInput from '#/FormTextareaInput.vue';
// import FormUnionInput from '#/FormUnionInput.vue';
// import FormUrlInput from '#/FormUrlInput.vue';

interface NormalObject {
  [propName: string]: any;
}

interface ConfigwithIndex extends Config {
  [propName: string]: any;
}

@Component({ components: { FormInput: () => import('#/FormInput.vue') } })
export default class FormObjectArrayInput extends Vue {

  @Prop(Object) private readonly configuration!: ConfigwithIndex;

  @Prop(String) private readonly identifier!: string;

  @Inject() private form!: any;

  @Provide() objectForm: any;

  private length = 1;

  // Form Layout
  private LabelLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  private noLabelLayout = { wrapperCol: { span: 18, offset: 6 } };

  private modelDisplay = false;

  private objectValue = '';

  private beforeCreate() {
    this.objectForm = [];
    this.objectForm[0] = this.$form.createForm(this);
  }


  // add a new item to the array
  private add() {
    this.objectForm[this.length] = this.$form.createForm(this);
    this.length += 1;
  }

  // remove certain index from the array
  private remove(index: number) {
    // Should have at least one item
    if (this.length === 1) return;

    // Reorganize formvalue
    const formValue: any[] = this.form.getFieldValue(this.identifier);

    // Update form value
    formValue.splice(index, 1);
    this.form.setFieldsValue({ [`${this.identifier}`]: formValue });
    this.length -= 1;
  }

  private validate(index: number, e: Event) {
    e.preventDefault();
    this.objectForm[index].validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const formValue = this.objectForm[index].getFieldsValue();
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
        this.form.setFieldsValue({ [`${this.identifier}`]: this.objectValue });
        this.modelDisplay = false;
      }
    });
  }
}
</script>
