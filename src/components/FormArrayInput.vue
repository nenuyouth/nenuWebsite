<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-22 18:45:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-23 18:04:09
 * @Description: Form Array Input
-->
<template>
  <div>
    <!-- 列表 -->
    <a-form-item
      :key="`${index}-${config}-${index}`"
      :required="index === 0"
      v-bind="index === 0 ? LabelLayout : noLabelLayout"
      v-for="(item, index) in form.getFieldValue(`${index}-${config}-key`)"
    >
      <template #label v-if="index === 0">
        <!-- 表单项名称 -->
        {{configuration.title}}
        <!-- 描述文字 -->
        <a-tooltip :title="configuration.desc" v-if="configuration.desc">
          <a-icon style="vertical-align:-0.125em;" type="question-circle"/>
        </a-tooltip>
      </template>
      <a-input
        style="width: 60%; margin-right: 8px"
        v-decorator="[
          `${index}-${config}[${index}]`,
          {
            validateTrigger: ['change', 'blur'],
            preserve: true,
            rules: [{
                required: true,
                type: configuration.element,
                whitespace: true,
                message: 'Please fill this item some value or delete this field.',
            }]
          }
        ]"
      />
      <a-icon
        :disabled="form.getFieldValue(`${index}-${config}-key`).length === 1"
        @click="() => remove(index,`${index}-${config}-key`)"
        class="dynamic-delete-button"
        type="minus-circle-o"
        v-if="form.getFieldValue(`${index}-${config}-key`).length > 1"
      />
    </a-form-item>
    <a-form-item :key="`${index}-${config}-add`" v-bind="noLabelLayout">
      <a-button @click="add(`${index}-${config}-key`)" style="width: 60%" type="dashed">
        <a-icon type="plus"/>新增项
      </a-button>
    </a-form-item>
  </div>
</template>
<script lang="ts">
import { Component, Inject, Prop, Vue } from 'vue-property-decorator';
import { Config } from '@/views/private/JsonEditor.vue';

let id = 0;

@Component
export default class FormArrayInput extends Vue {
  @Prop(Object) private configuration!: Config;

  @Prop(Number) private index!: number;

  @Prop(String) private config!: string;

  @Inject() private form!: any;

  private beforeCreate() {
    // check if the tag config has any array-type option
    if (this.configuration.type === 'array')
      this.form.getFieldDecorator(`${this.index}-${this.config}-key`, { initialValue: [], preserve: true, rules: { type: 'array' } });
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
}
</script>
