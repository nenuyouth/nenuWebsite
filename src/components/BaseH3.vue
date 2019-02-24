<template>
  <div :id="myId" :style="myStyle" class="myH3">{{ text }}</div>
</template>
<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';

interface Style {
  [propName: string]: string;
}

export default class BaseH3 extends Vue {
  @Prop(Number) private myId!: number;

  @Prop({ type: String, required: true }) private text!: string;

  @Prop([String, Object]) private myStyle!: string | Style;
}
</script>
<style scoped>
.myH3 {
  width: 100%;
  max-width: 600px;
  text-align: left;
  font-weight: 500;
  padding: 12px 15px 4px 15px;
  min-height: 24px;
  font-size: 22px;
  max-width: 600px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .myH3 {
    min-height: 26px;
    font-size: 24px;
  }
}

.myH3 + .myH3 {
  padding-top: 2px;
}
</style>
