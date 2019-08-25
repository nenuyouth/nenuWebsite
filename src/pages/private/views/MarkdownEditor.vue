<template>
  <div class="container">
    <a-button @click="editable=false" type="primary" v-if="editable">编辑</a-button>
    <a-button @click="editable=true" v-else>编辑</a-button>
    <div id="editor">
      <mavon-editor :editable="editable" style="height: 100%" v-model="value" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mavonEditor } from 'mavon-editor';

// @Component
@Component({ components: { mavonEditor } })
export default class MarkdownEditor extends Vue {
  private editable = false;

  private value = '';

  private mounted() {
    // TODO:
  }
}
</script>
<style lang='scss'>
@import '~mavon-editor/dist/css/index.css';
</style>
