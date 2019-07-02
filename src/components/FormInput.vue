<template>
  <component :configuration="configuration" :identifier="identifier" :is="tag" />
</template>
<script lang="ts">
import { Component, Inject, Prop, Vue } from 'vue-property-decorator';
import { Config } from '%/pageConfig';
import FormArrayInput from '#/FormArrayInput.vue';
import FormBooleanInput from '#/FormBooleanInput.vue';
import FormEnumInput from '#/FormEnumInput.vue';
import FormNumberInput from '#/FormNumberInput.vue';
import FormObjectArrayInput from '#/FormObjectArrayInput.vue';
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
    FormObjectArrayInput,
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

  @Inject() private form!: any;

  private get tag() {
    return typeof this.configuration.type === 'object'
      ? 'form-union-input'
      : this.configuration.enum
        ? 'form-enum-input'
        : `form-${this.configuration.type}-input`;
  }
}
</script>
