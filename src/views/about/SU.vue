<template>
  <base-page :pagedata="pageData"></base-page>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BasePage from '#/BasePage.vue';

@Component({ components: { BasePage } })
export default class SU extends Vue {
  private readonly pageData = JSON.stringify(require('assets/page/SU.json'));
}
</script>
