<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-24 18:39:40
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-02 13:28:59
 * @Description: Form Union Input
-->
<template>
  <component :configuration="configuration" :identifier="identifier" :is="tag">
    <template #type-select>
      <TypeSelect :identifier="identifier" :option="configuration.type" v-model="typeSelect" />
    </template>
  </component>
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
    FormBooleanInput,
    FormEnumInput,
    FormNumberInput,
    FormStringInput,
    FormTextareaInput,
    FormUrlInput,
    TypeSelect,
    FormArrayInput: () => import('#/FormArrayInput.vue')
  }
})
export default class FormUnionInput extends Vue {
  @Prop(Object) private readonly configuration!: Config;

  @Prop(String) private readonly identifier!: string;

  @Inject() private form!: any;

  private typeSelect = '';

  private get tag() {
    return `form-${this.typeSelect}-input`;
  }

  private created() {
    this.typeSelect = this.configuration.type[0];
  }

  @Watch('typeSelect')
  private onTypeChange() {
    this.form.resetFields([`${this.identifier}`]);
  }
}
</script>
