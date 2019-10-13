<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-15 20:56:30
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-25 23:23:39
 * @Description: Dropdown Title
-->
<template>
  <a-divider orientation="left">
    <a-dropdown>
      <a class="ant-dropdown-link">
        {{selectedText}}
        <a-icon type="down" />
      </a>
      <template #overlay>
        <a-menu>
          <template v-for="(item,index) in menu">
            <template v-if="item[1]==='TITLE'">
              <a-menu-divider :key="`divider${index}`" v-if="index!==0" />
              <a-menu-item :key="`title${index}`" disabled v-text="item[0]" />
            </template>
            <a-menu-item :key="`item${index}`" @click="itemChange(index)" v-else v-text="item[0]" />
          </template>
        </a-menu>
      </template>
    </a-dropdown>
  </a-divider>
</template>
<script lang="ts">
import { createComponent, onMounted, ref } from '@vue/composition-api';

interface Props {
  /** Menu List */
  menu: string[][];
  /** Internal selected Data */
  selected: string;
}

export default createComponent<Props, {}>({
  name: 'DropdownTitle',
  props: {
    menu: Array,
    selected: String
  },
  model: {
    prop: 'selected',
    event: 'change'
  },
  setup(props, context) {
    /** Displayed selected Data */
    const selectedText = ref('请选择');

    const itemChange = (index: number) => {
      selectedText.value = props.menu[index][0];
      context.emit('change', props.menu[index][1]);
      context.emit('onChange', props.menu[index][0]);
    };

    onMounted(() => {
      if (props.selected !== '请选择')
        props.menu.forEach(element => {
          if (props.selected === element[1]) selectedText.value = element[0];
        });
    });

    return {
      selectedText,
      itemChange
    };
  }
});
</script>
