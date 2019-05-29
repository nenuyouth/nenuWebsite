<template>
  <div class="container">
    信息是：{{msg}}
    <button @click="callFather">回消息</button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Message extends Vue {
  @Prop({ type: String, default: '张伯望' }) private readonly msg!: string;

  private a = 'b';
  private callFather() {
    const msgFromSon = '张伯望很帅';

    this.$emit('callFather', msgFromSon);
  }
}
</script>
