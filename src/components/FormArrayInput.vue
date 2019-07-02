<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-22 18:45:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-02 12:10:41
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
          <a-icon style="vertical-align:-0.125em;" type="question-circle" />
        </a-tooltip>
      </template>

      <div style="display:flex;align-items:center;">
        <form-input
          :configuration="itemConfiguration"
          :identifier="`${identifier}[${index}]`"
          :key="`${identifier}[${index}]`"
          class="formArrayInput"
        />

        <a-button
          @click="remove(index)"
          icon="minus"
          shape="circle"
          size="small"
          style="margin-bottom:24px;"
          v-if="length > 1"
        />
      </div>
    </a-form-item>
    <a-form-item :key="`${identifier}-add`" v-bind="noLabelLayout">
      <a-button @click="add" style="border-radius: 16px;">
        <a-icon type="plus" />新增项
      </a-button>
    </a-form-item>
  </div>
</template>
<script lang="ts">
import { Component, Inject, Prop, Vue } from 'vue-property-decorator';
import FormInput from '#/FormInput.vue';
import { Config } from '%/pageConfig';

// @Component({ components: { FormInput } })
@Component({ components: { FormInput: () => import('#/FormInput.vue') } })
export default class FormArrayInput extends Vue {
  @Prop(Object) private readonly configuration!: Config;

  @Prop(String) private readonly identifier!: string;

  @Inject() private form!: any;

  // Form Layout
  private LabelLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  private noLabelLayout = { wrapperCol: { span: 18, offset: 6 } };

  private length = 1;

  private get itemConfiguration() {
    const configuration = JSON.parse(JSON.stringify(this.configuration));

    configuration.type = configuration.element;
    delete configuration.element;
    delete configuration.title;
    delete configuration.desc;

    return configuration;
  }

  // add a new item to the array
  private add() {
    this.length += 1;
  }

  // remove certain index from the array
  private remove(index: number) {
    // Should have at least one item
    if (this.length === 1) return;

    // Reorganize formvalue
    const formValue: any[] = this.form.getFieldValue(this.identifier);

    console.log(formValue);
    // Update form value
    formValue.splice(index, 1);
    console.log(formValue);
    this.form.setFieldsValue({ [`${this.identifier}`]: formValue });
    this.length -= 1;
  }

}
</script>
<style>
.formArrayInput {
  width: calc(100% - 40px);
  margin-right: 8px;
}
</style>
