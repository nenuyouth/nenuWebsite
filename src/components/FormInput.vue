<template>
  <component :is="tag" :configuration="configuration" :identifier="identifier" />
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
    FormBooleanInput,
    FormEnumInput,
    FormNumberInput,
    FormStringInput,
    FormTextareaInput,
    FormUrlInput,
    FormArrayInput: () => import('#/FormArrayInput.vue'),
    FormObjectInput: () => import('#/FormObjectInput.vue'),
    FormUnionInput: () => import('#/FormUnionInput.vue')
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
