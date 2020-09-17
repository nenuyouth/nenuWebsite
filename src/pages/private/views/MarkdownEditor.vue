<template>
  <div class="container">
    <a-button
v-if="editable"
type="primary"
@click="editable = false"
      >编辑</a-button
    >
    <a-button v-else @click="editable = true">编辑</a-button>
    <div id="editor">
      <!-- <mavon-editor :editable="editable" style="height: 100%" v-model="value" /> -->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { mavonEditor } from 'mavon-editor';

// @Component({ components: { mavonEditor } })
@Component
export default class MarkdownEditor extends Vue {
  private editable = false;

  private value = "";

  private mounted() {
    // TODO:
  }
}
</script>
<style lang="scss">
// @import '~mavon-editor/dist/css/index.css';
</style>
