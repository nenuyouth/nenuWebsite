<template>
  <a-menu
    :defaultOpenKeys="['2']"
    :defaultSelectedKeys="['1']"
    :inlineCollapsed="collapsed"
    :theme="theme"
    @select="select"
    mode="inline"
    v-model="active"
  >
    <template v-for="item in list">
      <a-menu-item :key="item.key" v-if="!item.children">
        <template v-if="item.type">
          <icon-font :type="item.type" v-if="item.type.slice(0,5)==='icon-'"/>
          <a-icon :type="item.type" v-else/>
        </template>
        <span class="icon" v-else-if="item.icon"/>
        <span>{{item.title}}</span>
      </a-menu-item>
      <SubMenu :key="item.key" :menu-info="item" v-else/>
    </template>
  </a-menu>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import SubMenu, { MenuList } from '@/components/BaseSubMenu.vue';
import { Route } from 'vue-router';

interface SelectEvent {
  domEvent: MouseEvent;
  item: Vue;
  key: string;
  keyPath: string[];
  selectedKeys: string[];
}

@Component({ components: { SubMenu } })
export default class BaseMenu extends Vue {
  // 当前被选中的菜单列表
  private active = ['/'];

  // 是否展开
  private collapsed = false;

  // 菜单列表
  @Prop(Array) private list!: MenuList[];

  private get theme() {
    return this.$store.state.nightmode ? 'dark' : 'light';
  }

  // 点击菜单时进行跳转
  private select(e: SelectEvent) {
    this.$router.push(e.key);
  }

  // 挂载时激活对应menu项
  private mounted() {
    this.active = [this.$route.path];
  }

  @Watch('$route')
  private onRouteChange(to: Route) {
    this.active = [to.path];
  }
}
</script>
