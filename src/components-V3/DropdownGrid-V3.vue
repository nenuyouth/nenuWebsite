<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-15 20:56:30
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-25 21:19:39
 * @Description: Dropdown Grid
-->
<template>
  <a-divider orientation="left">
    <a-dropdown @click="visible=true" v-model="visible">
      <a class="ant-dropdown-link">
        {{selectedText}}
        <a-icon type="down" />
      </a>
      <template #overlay>
        <a-menu class="popMenu">
          <template v-for="(menulist, menuIndex) in list">
            <a-menu-item :key="menulist.title" disabled v-text="menulist.title" />
            <!-- <a-menu-divider v-if="index!==0" /> -->
            <a-row :key="`${menulist.title}-content`" class="menuCtn">
              <a-col :key="item.text" span="6" v-for="(item,index) in menulist.content">
                <a-menu-item @click="itemChange(menuIndex,index)" class="menuItem">
                  <icon-font
                    :type="item.icon"
                    class="popMenuIcon"
                    v-if="item.icon&&item.icon.slice(0,5)==='icon-'"
                  />
                  <a-icon :type="item.icon||item.id" class="popMenuIcon" v-else />
                  <div v-text="item.text" />
                </a-menu-item>
              </a-col>
            </a-row>
          </template>
          <a-menu-item disabled />
        </a-menu>
      </template>
    </a-dropdown>
  </a-divider>
</template>

<script lang="ts">
import { createComponent, onMounted, ref } from '@vue/composition-api';

interface GridMenuItem {
  text: string;
  id: string;
  icon: string;
}

export interface GridMenuList {
  title: string;
  content: GridMenuItem[];
}

interface Props {
  /** Menu List */
  list: GridMenuList[];
  /** Internal selected Data */
  selected: string;
}

export default createComponent<Props, {}>({
  name: 'DropdownGrid',
  props: {
    list: Array,
    selected: String
  },
  model: {
    prop: 'selected',
    event: 'change'
  },
  setup(props, context) {
    /** Displayed selected Data */
    const selectedText = ref('请选择');
    const visible = ref(false);

    const itemChange = (menuIndex: number, index: number) => {
      selectedText.value = props.list[menuIndex].content[index].text;
      context.emit('change', props.list[menuIndex].content[index].id);
      context.emit('onChange', props.list[menuIndex].content[index].text);
      visible.value = false;
    };

    onMounted(() => {
      if (props.selected !== '请选择')
        props.list.forEach(menuList => {
          menuList.content.forEach(element => {
            if (props.selected === element.id) selectedText.value = element.text;
          });
        });
    });

    return {
      selectedText,
      visible,
      itemChange
    };
  }
});
</script>

<style lang='scss' scoped>
@import '~%/Weui/scss/border';

.popMenu {
  width: 500px;
  max-width: 90%;
  background-color: #fff;
}

.menuCtn {
  background-color: #fefefe;
  width: 100%;
  position: relative;
  &:before {
    display: block !important;
    @include topBorder(#cac9ce);
  }
  &:after {
    display: block !important;
    @include leftBorder(#cac9ce);
  }
}

.menuItem {
  position: relative;
  text-align: center;
  padding: 16px 8px;
  box-sizing: border-box;
  text-align: center;
  &:before {
    @include rightBorder(#cac9ce);
  }
  &:after {
    @include bottomBorder(#cac9ce);
  }
  &:active {
    background-color: #ececec;
  }
}

.popMenuIcon {
  margin: 4px auto;
  font-size: 24px;
}
</style>
