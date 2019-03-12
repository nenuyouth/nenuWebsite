<template>
  <div id="editor">
    <mavon-editor :editable="editable" style="height: 100%"></mavon-editor>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import 'mavon-editor/dist/css/index.css';

// tslint:disable-next-line:no-var-requires
const mavonEditor = require('mavon-editor');
// import { mavonEditor } from 'mavon-editor';

@Component({ components: { mavonEditor } })
export default class MarkdownEditor extends Vue {
  editable = false;

  private mounted() {
    // TODO:
  }
}
</script>
