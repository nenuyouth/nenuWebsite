<template>
  <div>
    <!-- 联合类型输入 -->
    <form-union-input
      :configuration="configuration"
      :identifier="identifier"
      v-if="typeof configuration.type==='object'"
    />

    <!-- 可遍历值输入 -->
    <form-enum-input
      :configuration="configuration"
      :identifier="identifier"
      v-else-if="configuration.enum"
    />

    <!-- 对象输入 -->
    <form-object-input
      :configuration="configuration"
      :identifier="identifier"
      v-else-if="configuration.type==='object'"
    />

    <!-- 布尔值输入 -->
    <form-boolean-input
      :configuration="configuration"
      :identifier="identifier"
      v-else-if="configuration.type==='boolean'"
    />

    <!-- 数字输入 -->
    <form-number-input
      :configuration="configuration"
      :identifier="identifier"
      v-else-if="configuration.type==='number'"
    />

    <!-- 单行输入 -->
    <form-string-input
      :configuration="configuration"
      :identifier="identifier"
      v-else-if="configuration.type==='string'"
    />

    <!-- 网址输入 -->
    <form-url-input
      :configuration="configuration"
      :identifier="identifier"
      v-else-if="configuration.type==='url'"
    />

    <!-- 多行输入 -->
    <form-textarea-input
      :configuration="configuration"
      :identifier="identifier"
      v-else-if="configuration.type==='mutiline'"
    />

    <!-- 数组输入 -->
    <form-array-input
      :configuration="configuration"
      :identifier="identifier"
      v-else-if="configuration.type==='array'"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Provide, Vue } from 'vue-property-decorator';
import { Config } from '%/pageConfig';
import FormArrayInput from '#/FormArrayInput.vue';
import FormBooleanInput from '#/FormBooleanInput.vue';
import FormEnumInput from '#/FormEnumInput.vue';
import FormNumberInput from '#/FormNumberInput.vue';
import FormObjectInput from '#/FormObjectInput.vue';
import FormStringInput from '#/FormStringInput.vue';
import FormTextareaInput from '#/FormTextareaInput.vue';
import FormUnionInput from '#/FormUnionInput.vue';
import FormUrlInput from '#/FormUrlInput.vue';

@Component({
  components: {
    FormArrayInput,
    FormBooleanInput,
    FormEnumInput,
    FormNumberInput,
    FormObjectInput,
    FormStringInput,
    FormTextareaInput,
    FormUnionInput,
    FormUrlInput
  }
})
export default class FormInput extends Vue {
  @Prop(Object) private readonly configuration!: Config;

  @Prop(String) private readonly identifier!: string;
}
</script>
