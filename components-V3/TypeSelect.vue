<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-15 20:56:30
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-26 00:08:06
 * @Description: Type Select
-->
<template>
  <!-- 选择需要的值类型 -->
  <a-radio-group :value="selected" @change="onChange($event.target.value)" buttonStyle="solid">
    <a-radio-button :key="item" :value="item" v-for="item in option">{{item}}</a-radio-button>
  </a-radio-group>
</template>
<script lang="ts">
import { createComponent, inject, onMounted } from '@vue/composition-api';

interface Props {
  // Option List
  option: string[];

  // Form value identifier
  identifier: string;

  // Select
  selected?: string;
}

export default createComponent<Props, {}>({
  name: 'TypeSelect',
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: {
    option: { type: Array, required: true },
    identifier: { type: String, required: true },
    selected: String
  },
  setup(props, context) {
    const form = inject('form');

    onMounted(() => {
      // If the select value is not seted, select the first option by default
      if (props.selected === '')
        context.emit('change', props.option[0]);
    });

    const onChange = (value: string) => {
      context.emit('change', value);
    };

    return { form, onChange };
  }
});
</script>
