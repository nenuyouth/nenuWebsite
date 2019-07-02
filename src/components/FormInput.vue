<template>
  <component :configuration="configuration" :identifier="identifier" :is="tag" />
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Config } from '%/pageConfig';
import FormBooleanInput from '#/FormBooleanInput.vue';
import FormEnumInput from '#/FormEnumInput.vue';
import FormNumberInput from '#/FormNumberInput.vue';
import FormStringInput from '#/FormStringInput.vue';
import FormTextareaInput from '#/FormTextareaInput.vue';
import FormUrlInput from '#/FormUrlInput.vue';

@Component({
  components: {
    FormArrayInput: () => import('#/FormArrayInput.vue'),
    FormBooleanInput,
    FormEnumInput,
    FormNumberInput,
    FormObjectInput: () => import('#/FormObjectInput.vue'),
    FormStringInput,
    FormTextareaInput,
    FormUnionInput: () => import('#/FormUnionInput.vue'),
    FormUrlInput
  }
})
export default class FormInput extends Vue {
  @Prop(Object) private readonly configuration!: Config;

  @Prop(String) private readonly identifier!: string;

  private get tag() {
    return typeof this.configuration.type === 'object'
      ? 'form-union-input'
      : this.configuration.enum
        ? 'form-enum-input'
        : `form-${this.configuration.type}-input`;
  }
}
</script>
