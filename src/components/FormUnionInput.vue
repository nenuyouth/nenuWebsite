<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-24 18:39:40
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-07 16:17:08
 * @Description: Form Union Input
-->
<template>
  <component :is="tag" :configuration="configuration" :identifier="identifier">
    <template #type-select>
      <TypeSelect
        v-model="typeSelect"
        :identifier="identifier"
        :option="configuration.type"
      />
    </template>
  </component>
</template>
<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";
import { Config } from "%/pageConfig";
import FormBooleanInput from "#/FormBooleanInput.vue";
import FormEnumInput from "#/FormEnumInput.vue";
import FormNumberInput from "#/FormNumberInput.vue";
import FormStringInput from "#/FormStringInput.vue";
import FormTextareaInput from "#/FormTextareaInput.vue";
import FormUrlInput from "#/FormUrlInput.vue";
import TypeSelect from "#/TypeSelect.vue";

@Component({
  components: {
    FormBooleanInput,
    FormEnumInput,
    FormNumberInput,
    FormStringInput,
    FormTextareaInput,
    FormUrlInput,
    TypeSelect,
    FormArrayInput: () => import("#/FormArrayInput.vue"),
  },
})
export default class FormUnionInput extends Vue {
  @Prop(Object) private readonly configuration!: Config;

  @Prop(String) private readonly identifier!: string;

  @Inject() private form!: any;

  private typeSelect = "";

  private get tag() {
    return `form-${this.typeSelect}-input`;
  }

  private created() {
    this.typeSelect = this.configuration.type[0];
  }

  @Watch("typeSelect")
  private onTypeChange() {
    this.form.resetFields([`${this.identifier}`]);
  }
}
</script>
