<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-22 18:45:04
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-25 19:41:03
 * @Description: Form Array Input
-->
<template>
  <div>
    <!-- 列表 -->
    <a-form-item
      v-for="(item, index) in length"
      :key="`${identifier}-${index}`"
      :required="index === 0"
      v-bind="index === 0 ? LabelLayout : noLabelLayout"
    >
      <template v-if="index === 0" #label>
        <!-- 表单项名称 -->
        {{ configuration.title }}
        <!-- 描述文字 -->
        <a-tooltip v-if="configuration.desc" :title="configuration.desc">
          <a-icon style="vertical-align: -0.125em" type="question-circle" />
        </a-tooltip>
      </template>

      <div style="display: flex; align-items: center">
        <form-input
          :key="`${identifier}[${index}]`"
          :configuration="itemConfiguration"
          :identifier="`${identifier}[${index}]`"
          class="formArrayInput"
        />

        <a-button
          v-if="length > 1"
          icon="minus"
          shape="circle"
          size="small"
          style="margin-bottom: 24px"
          @click="remove(index)"
        />
      </div>
    </a-form-item>
    <a-form-item :key="`${identifier}-add`" v-bind="noLabelLayout">
      <a-button style="border-radius: 16px" @click="add">
        <a-icon type="plus" />新增项
      </a-button>
    </a-form-item>
  </div>
</template>
<script lang="ts">
import { Component, Inject, Prop, Vue } from "vue-property-decorator";
import { Config } from "%/pageConfig";

@Component({ components: { FormInput: () => import("#/FormInput.vue") } })
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
