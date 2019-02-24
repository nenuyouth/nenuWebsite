<template>
  <div id='app'>
    <transition :name='transitionName'>
      <keep-alive :max='10'>
        <router-view/>
        <!-- <router-view v-wechat-title="$route.meta.title"/> -->
      </keep-alive>
    </transition>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component
export default class App extends Vue {
  private transitionName = 'slide-right';

  @Watch('$route')
  private onRouteChanged(to: Route, from: Route) {
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

    // 改变动画效果
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';

    // 路由发生变化修改页面title
    if (to.meta && to.meta.title) {
      document.getElementsByTagName('title')[0].innerText = to.meta.title;
      document.title = to.meta.title;
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s;
  background-color: #fff;
}
.slide-left-leave-active,
.slide-right-leave-active {
  position: relative;
}
.slide-left-enter-active,
.slide-right-enter-active {
  position: absolute;
  top: 3rem;
}
.slide-left-leave-active,
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-left-enter,
.slide-right-leave-active {
  transform: translateX(100%);
}
</style>
