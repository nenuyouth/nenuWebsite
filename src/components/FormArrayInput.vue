<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-22 18:45:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-24 18:32:02
 * @Description: Form Array Input
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
          <a-icon style="vertical-align:-0.125em;" type="question-circle"/>
        </a-tooltip>
      </template>

      <a-input
        style="width:calc(100% - 40px);margin-right: 8px"
        v-decorator="[
          `${identifier}[${index}]`,
          {
            validateTrigger: ['change', 'blur'],
            preserve: true,
            rules: [{
                required: true,
                type: configuration.element,
                whitespace: true,
                message: '请补充此项或将此项删除'
            }]
          }
        ]"
      />
      <a-button @click="remove(index)" icon="minus" shape="circle" size="small" v-if="length > 1"/>
    </a-form-item>
    <a-form-item :key="`${identifier}-add`" v-bind="noLabelLayout">
      <a-button @click="add" style="border-radius: 16px;">
        <a-icon type="plus"/>新增项
      </a-button>
    </a-form-item>
  </div>
</template>
<script lang="ts">
import { Component, Inject, Prop, Vue } from 'vue-property-decorator';
import { Config } from '@/views/private/JsonEditor.vue';

@Component
export default class FormArrayInput extends Vue {
  @Prop(Object) private configuration!: Config;

  @Prop(String) private identifier!: string;

  @Inject() private form!: any;

  private length = 1;

  // Form Layout
  private LabelLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  private noLabelLayout = { wrapperCol: { span: 18, offset: 6 } };

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

  private add() {
    this.length += 1;
  }
}
</script>
