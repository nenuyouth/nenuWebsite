<template>
  <transition :name="transitionName" mode="in-out">
    <keep-alive>
      <my-doc :key="path" :path="path"></my-doc>
    </keep-alive>
  </transition>
</template>

<script lang="ts">
import MyDoc from "@/components/MyDoc.vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({ components: { MyDoc } })
export default class Doc extends Vue {
  private transitionName = "slide-left";

  @Prop({ type: String, default: "main" }) private path1!: string;

  @Prop(String) private path2!: string;

  @Prop(String) private path3!: string;

  @Prop(String) private path4!: string;

  get path() {
    const paths = [this.path1, this.path2, this.path3, this.path4];
    let finalPath = "";

    // 处理获得最终路径
    paths.forEach(path => {
      if (path) finalPath += `/${path}`;
    });

    return finalPath;
  }

  @Watch("$route")
  private OnRouteUpdate(to: any, from: any) {
    const remove = (array: string[], value: string) => {
      for (let i = 0; i < array.length; i += 1)
        if (array[i] === value) {
          array.splice(i, 1);
          i -= 1;
        }

      return array;
    };
    const toDepth = remove(to.path.split("/"), "").length;
    const fromDepth = remove(from.path.split("/"), "").length;

    this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
  }
}
</script>
