<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-19 17:25:48
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-30 00:39:27
 * @Description: 测试
-->
<template>
  <div class="container">
    <a-form :form="form" @submit="handleSubmit">
      <template v-for="(part,partIndex) in tags">
        <!-- 循环pageJson -->

        <!-- 带有分割线、下拉列表的标题 -->
        <!-- <DropdownTitle :key="partIndex" :menu="tagList" v-model="tags[partIndex]" /> -->
        <DropdownGrid :key="partIndex" :list="tagList" v-model="tags[partIndex]" />

        <!-- 选项列表 -->
        <template v-if="part!=='请选择'">
          <template v-for="config in Object.keys(configuration[part])">
            <form-input
              :configuration="configuration[part][config]"
              :identifier="`${partIndex}-${config}`"
              :key="`${partIndex}-${config}`"
            />
          </template>
        </template>
      </template>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button @click="addComponent" class="addNewBtn" type="primary">
          <a-icon type="plus" />新增
        </a-button>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button html-type="submit" type="primary">检查JSON文件</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Provide, Vue } from 'vue-property-decorator';
import DropdownGrid, { GridMenuList } from '#/DropdownGrid.vue';
import DropdownTitle from '#/DropdownTitle.vue';
import FormInput from '#/FormInput.vue';

interface UnionTypeItem {
  [props: string]: string;
}

interface EnumConfig {
  value: any;
  label: string;
}

export interface Config {
  title: string;
  desc?: string;
  type: string | string[];
  required: boolean;
  default?: any;
  enum?: EnumConfig[];
  element?: string[] | string;
  step?: number;
}

interface Configuration {
  readonly [propName: string]: {
    [propName: string]: Config;
  };
}

interface NormalObject {
  [propName: string]: any;
}

@Component({
  components: {
    DropdownGrid,
    DropdownTitle,
    FormInput
  }
})
export default class FormTest extends Vue {
  @Provide() private form: any;

  private pageJson = '';

  private tags: string[] = ['head'];

  private unionTypeSelect: UnionTypeItem[] = [{}];

  private get configuration() {
    const configuration: Configuration = require('../assets/jsonConfig');

    return configuration;
  }

  private get tagList() {
    const tagList: GridMenuList[] = require('../assets/tagList');

    return tagList;
  }

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      console.log('Received values of form: ', values);
      if (!err) {
        const json: NormalObject[] = [];
        const formValue = this.form.getFieldsValue();

        this.tags.forEach(tag => {
          json.push({ tag });
        });

        Object.keys(formValue).forEach(x => {
          const [indexString, key, additional] = x.split('-');
          const index = Number(indexString);
          const value = formValue[x];

          // 保证value有定义且不为默认值
          if (!additional && typeof value !== 'undefined' && value !== this.configuration[json[index].tag][key].default)
            json[index][key] = value;
        });

        console.log(json, JSON.stringify(json));

        this.pageJson = JSON.stringify(json);
      }
    });
  }

  // Add a new component in the end
  private addComponent() {
    this.tags.push('请选择');
  }
}
</script>
<style scoped>
.addNewBtn {
  border-radius: 16px;
}
</style>
