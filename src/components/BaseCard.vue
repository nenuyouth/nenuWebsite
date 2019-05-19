<template>
  <div class="row text-center">
    <div :key="item.title" class="col-lg-4 col-md-6 py-2" v-for="item in cardList">
      <div class="card box-shadow">
        <div
          :aria-controls="item.title"
          :data-target="`#${item.id}`"
          aria-expanded="false"
          class="card-header btn"
          data-toggle="collapse"
          role="button"
        >
          <h4 class="mx-1 my-0 font-weight-normal">
            <img :src="item.icon" alt height="24" style="margin-right: 0.8rem;" width="24">
            {{ item.title }}
          </h4>
        </div>
        <div :id="item.id" class="collapse">
          <div class="card-body d-block d-md-none">
            <h1 class="card-title pricing-card-title">
              ￥{{ item.price }}
              <small class="text-muted">/起</small>
            </h1>
            <ul class="list-unstyled mb-3">
              <li :key="listItem" v-for="listItem in item.desc" v-html="listItem"></li>
            </ul>
            <router-link
              :to="item.url"
              class="btn btn-lg btn-block btn-primary"
              tag="button"
              type="button"
            >了解更多</router-link>
          </div>
        </div>
        <div class="card-body d-none d-md-block">
          <h1 class="card-title pricing-card-title">
            ￥{{ item.price }}
            <small class="text-muted">/起</small>
          </h1>
          <ul class="list-unstyled mb-3">
            <li :key="listItem" v-for="listItem in item.desc" v-html="listItem"></li>
          </ul>
          <router-link
            :to="item.url"
            class="btn cardBtn1 btn-outline-primary"
            tag="button"
            type="button"
          >了解更多</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface Card {
  title: string;
  price: number;
  desc: string[];
  url: string;
  id?: string;
}

@Component
export default class BaseCard extends Vue {
  @Prop(Number) private readonly myId!: number;

  @Prop({ required: true, type: Array }) private readonly list!: Card[];

  private cardList: Card[] = [];

  private created() {
    this.cardList = JSON.parse(JSON.stringify(this.list));
    this.cardList.forEach((element, index) => {
      element.id = `${this.myId}card-collapse-${index}`;
    });
  }
}
</script>
<style scoped>
.cardBtn1 {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}
</style>
