<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-19 17:25:48
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-21 00:28:46
 * @Description: 测试
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
  private a(e: any) {
    console.log(e);
  }

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

    const json = [];
    // this.form.getFieldsValue()


  }
  private handleSelectChange(value: any) {
    this.form.setFieldsValue({ note: `Hi, ${value === 'male' ? 'man' : 'lady'}!` });
  }

  private pageJson: any[] = [];

  private tagList = require('|/JsonEditor/tagList');

  private tags: string[] = ['请选择'];

  private unionTypeSelect: UnionTypeItem[] = [{}];

  // private configuration= require('|/JsonEditor/jsonConfig');
  private configuration = {
    head: {
      title: {
        title: '导航栏标题',
        desc: '一般不超过八个字，六字以下为佳',
        type: 'string',
        required: true
      },
      desc: {
        title: '标题描述文字',
        desc: '该描述文字仅在特定主题下展示，所以仅供补充界面主题，不可放置重要信息',
        type: 'mutiline',
        required: false
      },
      action: {
        title: '按钮函数名',
        desc: '填入左上角按钮点击时所触发的函数名称，不填时默认执行返回，设置为true来隐藏默认的返回按钮',
        type: ['string', 'boolean'],
        required: false
      },
      leftText: {
        title: '按钮文字',
        desc: '设置左上角文字，一般不用填写，可自动生成',
        type: 'string',
        required: false
      },
      grey: {
        title: '灰色背景',
        desc: '默认为白色背景',
        type: 'boolean',
        required: false,
        default: false
      },
      hidden: {
        title: '隐藏导航栏',
        desc: '设置后不显示导航栏',
        type: 'boolean',
        required: false,
        default: false
      },
      shareable: {
        title: '可被分享',
        desc: '设置该界面是否可以使用小程序的界面分享',
        type: 'boolean',
        required: false,
        default: false
      },
      contact: {
        title: '联系开发者',
        desc: '是否在分享弹出菜单中显示“联系开发者”按钮',
        type: 'boolean',
        required: false,
        default: false
      },
      feedback: {
        title: '意见反馈',
        desc: '是否在分享弹出菜单中显示“意见反馈”按钮',
        type: 'boolean',
        required: false,
        default: false
      }
    },
    title: {
      text: {
        title: '大标题文字',
        type: 'mutiline',
        required: true
      },
      style: {
        title: '标题css样式',
        type: 'string',
        required: false
      }
    },
    p: {
      text: {
        title: '段落的文字',
        type: 'mutiline',
        required: true
      },
      head: {
        title: '段落标题',
        desc: '填入true会在留空占位',
        type: ['string', 'boolean'],
        required: false
      },
      align: {
        title: '段落对齐方式',
        type: 'string',
        enum: [
          { label: '左对齐', value: 'left' },
          { label: '居中', value: 'center' },
          { label: '右对齐', value: 'right' },
          { label: '两端对齐', value: 'justify' }
        ],
        required: false,
        default: 'left'
      }
    }
  };

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
