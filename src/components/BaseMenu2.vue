<template>
  <div style="width: 256px">
    <a-button @click="toggleCollapsed" style="margin-bottom: 16px" type="primary">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'"/>
    </a-button>
    <a-menu
      :defaultOpenKeys="['2']"
      :defaultSelectedKeys="['1']"
      :inlineCollapsed="collapsed"
      mode="inline"
      theme="dark"
    >
      <template v-for="item in list">
        <a-menu-item :key="item.key" v-if="!item.children">
          <a-icon type="pie-chart"/>
          <span>{{item.title}}</span>
        </a-menu-item>
        <SubMenu :key="item.key" :menu-info="item" v-else/>
      </template>
    </a-menu>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import SubMenu from '@/components/BaseSubMenu.vue';

@Component({ components: { SubMenu } })
export default class Menu extends Vue {
  private collapsed = false;

  private list = [
    {
      key: '1',
      title: 'Option 1'
    },
    {
      key: '2',
      title: 'Navigation 2',
      children: [
        {
          key: '2.1',
          title: 'Navigation 3',
          children: [
            {
              key: '2.1.1',
              title: 'Option 2.1.1'
            }
          ]
        }
      ]
    }
  ];

  private toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
}
</script>
