<template>
  <transition :name="transitionName" mode="in-out">
    <keep-alive>
      <MyDoc :baselength="5" :key="path" :path="path"></MyDoc>
    </keep-alive>
  </transition>
</template>

<script lang="ts">
import MyDoc from '@/components/MyDoc.vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component({ components: { MyDoc } })
export default class Doc extends Vue {
  private transitionName = 'slide-left';

  private get path() {
    const markDownPath = this.$route.path.slice(5);

    return markDownPath || 'readme';
  }

  @Watch('$route')
  private onRouteUpdate(to: Route, from: Route) {
    const remove = (array: string[], value: string) => {
      for (let i = 0; i < array.length; i += 1)
        if (array[i] === value) {
          array.splice(i, 1);
          i -= 1;
        }

      return array;
    };
    const toDepth = remove(to.path.split('/'), '').length;
    const fromDepth = remove(from.path.split('/'), '').length;

    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
  }
}
</script>
