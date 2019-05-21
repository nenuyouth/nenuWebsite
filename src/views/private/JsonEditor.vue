<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-19 17:25:48
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-21 00:29:25
 * @Description: Json Editor
-->
<template>
  <div class="container">
    <a-form :form="form" @submit="handleSubmit">
      <template v-for="(part,partIndex) in tags">
        <!-- 循环pageJson -->

        <!-- 带有分割线、下拉列表的标题 -->
        <DropdownTitle :key="partIndex" :menu="tagList" v-model="tags[partIndex]"/>

        <!-- 选项列表 -->
        <template v-if="part!=='请选择'">
          <template v-for="config in Object.keys(configuration[part])">
            <!-- 每个选项设置 -->

            <a-form-item
              :key="`${partIndex}-${config}`"
              :label="configuration[part][config].title"
              :label-col="{span:5}"
              :wrapper-col="{span:19}"
            >
              <!-- 复合类型 -->
              <template v-if="typeof configuration[part][config].type==='object'">
                <!-- 选择需要的值类型 -->
                <TypeSelect
                  :option="configuration[part][config].type"
                  v-model="unionTypeSelect[partIndex][config]"
                />

                <!-- 布尔值输入 -->
                <a-radio-group
                  :name="`${partIndex}-${config}`"
                  :options=" [{ label: 'True', value: true }, { label: 'False', value: false }]"
                  v-decorator="[
                    `${partIndex}-${config}`,
                    {
                      initialValue: configuration[part][config].default,
                      rules: [{
                        required: configuration[part][config].required,
                        type: 'boolean'
                      }]
                    }
                  ]"
                  v-if="unionTypeSelect[partIndex][config]==='boolean'"
                />

                <!-- 多行输入 -->
                <a-textarea
                  autosize
                  v-decorator="[
                    `${partIndex}-${config}`,
                    {
                      initialValue: configuration[part][config].default,
                      rules: [{
                        required: configuration[part][config].required,
                        type: 'string'
                      }]
                    }
                  ]"
                  v-else-if="unionTypeSelect[partIndex][config]==='mutiline'"
                />

                <!-- 单行输入 -->
                <a-input
                  v-decorator="[
                    `${partIndex}-${config}`,
                    {
                      initialValue: configuration[part][config].default,
                      rules: [{
                        required: configuration[part][config].required,
                        type: 'string'
                      }]
                    }
                  ]"
                  v-else-if="unionTypeSelect[partIndex][config]==='string'"
                />
              </template>

              <!-- 简单类型 -->
              <template v-else>
                <!-- 可遍历值输入 -->
                <a-radio-group
                  :name="`${partIndex}-${config}`"
                  :options="configuration[part][config].enum"
                  v-decorator="[
                    `${partIndex}-${config}`,
                    {
                      initialValue: configuration[part][config].default,
                      rules: [{
                        required: configuration[part][config].required,
                        type: configuration[part][config].type,
                        enum: configuration[part][config].enum
                      }]
                    }
                  ]"
                  v-if="configuration[part][config].enum"
                />

                <!-- 布尔值输入 -->
                <a-radio-group
                  :name="`${partIndex}-${config}`"
                  :options=" [{ label: 'True', value: true }, { label: 'False', value: false }]"
                  v-decorator="[
                    `${partIndex}-${config}`,
                    {
                      initialValue: configuration[part][config].default,
                      rules: [{
                        required: configuration[part][config].required,
                        type: 'boolean'
                      }]
                    }
                  ]"
                  v-else-if="configuration[part][config].type==='boolean'"
                />

                <!-- 多行输入 -->
                <a-textarea
                  autosize
                  v-decorator="[
                    `${partIndex}-${config}`,
                    {
                      initialValue: configuration[part][config].default,
                      rules: [{
                        required: configuration[part][config].required,
                        type: 'string'
                      }]
                    }
                  ]"
                  v-else-if="configuration[part][config].type==='mutiline'"
                />

                <!-- 单行输入 -->
                <a-input
                  v-decorator="[
                    `${partIndex}-${config}`,
                    {
                      initialValue: configuration[part][config].default,
                      rules: [{
                        required: configuration[part][config].required,
                        type: 'string'
                      }]
                    }
                  ]"
                  v-else-if="configuration[part][config].type==='string'"
                />
              </template>
              <!-- 描述文字 -->
              <div
                class="desc"
                v-if="configuration[part][config].desc"
                v-text="configuration[part][config].desc"
              />
            </a-form-item>
          </template>
        </template>
      </template>
      <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="Note">
        <a-input
          v-decorator="['username', {rules: [{ required: true, message: 'Please input your name' }] }]"
        />
      </a-form-item>
      <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="Gender">
        <a-select
          @change="handleSelectChange"
          placeholder="Select a option and change input text above"
          v-decorator="[
          'gender',
          {rules: [{ required: true, message: 'Please select your gender!' }]}
        ]"
        >
          <a-select-option value="male">male</a-select-option>
          <a-select-option value="female">female</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button html-type="submit" type="primary">Submit</a-button>
      </a-form-item>
    </a-form>
    <div>
      <a-button @click="addComponent" class="addNewBtn" type="primary">
        <a-icon type="plus"/>新增
      </a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import DropdownTitle from '#/DropdownTitle.vue';
import TypeSelect from '#/TypeSelect.vue';

interface UnionTypeItem {
  [props: string]: string;
}

@Component({ components: { DropdownTitle, TypeSelect } })
export default class FormTest extends Vue {
  private formLayout = 'horizontal';

  private form: any;

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      if (!err) console.log('Received values of form: ', values);
    });
  }
  private handleSelectChange(value: any) {
    console.log(value);
    this.form.setFieldsValue({ note: `Hi, ${value === 'male' ? 'man' : 'lady'}!` });
  }

  private tagList = require('|/JsonEditor/tagList');

  private tags: string[] = ['请选择'];

  private unionTypeSelect: UnionTypeItem[] = [{}];

  private configuration = require('|/JsonEditor/jsonConfig');

  // Add a new component in the end
  private addComponent() {
    this.tags.push('请选择');
    this.unionTypeSelect.push({});
  }

  // Set the tag value when clicking on the dropdown items
  private setTag(partIndex: number, index: number, list: number) {
    this.$set(this.tags, partIndex, this.tagList[list][index][1]);
  }
}
</script>
<style scoped>
.desc {
  line-height: 18px;
  font-size: 13px;
  color: #888;
}
.addNewBtn {
  border-radius: 16px;
}
</style>
