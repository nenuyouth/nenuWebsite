<template>
  <div>
    <div :key="part.text" v-for="part in json">
      <a-input :key="config" v-for="config in configuration[part.tag]"></a-input>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

export default class JsonEditor extends Vue {
  private Json = [];
}
</script>
<style>
</style>

