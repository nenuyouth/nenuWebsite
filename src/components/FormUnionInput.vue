<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-24 18:39:40
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-29 23:14:53
 * @Description: Form Union Input
-->
<template>
  <div>
    <!-- 可遍历值输入 -->
    <form-enum-input
      :configuration="configuration"
      :identifier="identifier"
      :key="`${identifier}-enum`"
      v-if="typeSelect === 'enum'"
    >
      <template #type-select>
        <TypeSelect :identifier="identifier" :option="configuration.type" v-model="typeSelect"/>
      </template>
    </form-enum-input>

    <!-- 布尔值输入 -->
    <form-boolean-input
      :configuration="configuration"
      :identifier="identifier"
      :key="`${identifier}-boolean`"
      v-else-if="typeSelect === 'boolean'"
    >
      <template #type-select>
        <TypeSelect :identifier="identifier" :option="configuration.type" v-model="typeSelect"/>
      </template>
    </form-boolean-input>

    <!-- 数字输入 -->
    <form-number-input
      :configuration="configuration"
      :identifier="identifier"
      :key="`${identifier}-number`"
      v-else-if="typeSelect === 'number'"
    >
      <template #type-select>
        <TypeSelect :identifier="identifier" :option="configuration.type" v-model="typeSelect"/>
      </template>
    </form-number-input>

    <!-- 单行输入 -->
    <form-string-input
      :configuration="configuration"
      :identifier="identifier"
      :key="`${identifier}-string`"
      v-else-if="typeSelect ==='string'"
    >
      <template #type-select>
        <TypeSelect :identifier="identifier" :option="configuration.type" v-model="typeSelect"/>
      </template>
    </form-string-input>

    <!-- 网址输入 -->
    <form-url-input
      :configuration="configuration"
      :identifier="identifier"
      :key="`${identifier}-url`"
      v-else-if="typeSelect ==='url'"
    >
      <template #type-select>
        <TypeSelect :identifier="identifier" :option="configuration.type" v-model="typeSelect"/>
      </template>
    </form-url-input>

    <!-- 多行输入 -->
    <form-textarea-input
      :configuration="configuration"
      :identifier="identifier"
      :key="`${identifier}-mutiline`"
      v-else-if="typeSelect ==='mutiline'"
    />

    <!-- 数组输入 -->
    <form-array-input
      :configuration="configuration"
      :identifier="identifier"
      :key="`${identifier}-array`"
      v-else-if="typeSelect ==='array'"
    >
      <template #type-select>
        <TypeSelect :identifier="identifier" :option="configuration.type" v-model="typeSelect"/>
      </template>
    </form-array-input>
  </div>
</template>
<script lang="ts">
import {
  Component, Inject, Prop, Vue, Watch
} from 'vue-property-decorator';
import { Config } from '%/pageConfig';
import TypeSelect from '#/TypeSelect.vue';
import FormArrayInput from '#/FormArrayInput.vue';
import FormBooleanInput from '#/FormBooleanInput.vue';
import FormEnumInput from '#/FormEnumInput.vue';
import FormNumberInput from '#/FormNumberInput.vue';
import FormStringInput from '#/FormStringInput.vue';
import FormTextareaInput from '#/FormTextareaInput.vue';
import FormUrlInput from '#/FormUrlInput.vue';

@Component({
  components: {
    FormArrayInput,
    FormBooleanInput,
    FormEnumInput,
    FormNumberInput,
    FormStringInput,
    FormTextareaInput,
    FormUrlInput,
    TypeSelect
  }
})
export default class FormUnionInput extends Vue {
  @Prop(Object) private readonly configuration!: Config;

  @Prop(String) private readonly identifier!: string;

  private typeSelect = '';

  private created() {
    this.typeSelect = this.configuration.type[0];
  }

  @Inject() private form!: any;

  @Watch('typeSelect')
  private onTypeChange() {
    this.form.resetFields([`${this.identifier}`]);
  }
}
</script>
