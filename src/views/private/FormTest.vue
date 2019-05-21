<!--
 * @Author: Mr.Hope
 * @Date: 2019-05-19 17:25:48
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-05-21 13:16:00
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

                <!-- 对象输入 -->
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
                  v-else-if="configuration[part][config].type==='object'"
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

interface Configuration {
  readonly [propName: string]: {
    [propName: string]: {
      title: string;
      desc?: string;
      type: string | string[];
      required: boolean;
      default?: any;
      enum?: any[];
    };
  };
}

interface NormalObject {
  [propName: string]: any;
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

    const json: NormalObject[] = [];
    const formValue = this.form.getFieldsValue();

    this.tags.forEach(tag => {
      json.push({ tag });
    });

    Object.keys(formValue).forEach(x => {
      const [indexString, key] = x.split('-');
      const index = Number(indexString);
      const value = formValue[x];

      // console.log(index);
      if (value !== this.configuration[json[index].tag][key].default && (value || value === false || value === '' || value === 0))
        json[index][key] = value;
    });

    console.log(json);
  }

  private handleSelectChange(value: any) {
    this.form.setFieldsValue({ note: `Hi, ${value === 'male' ? 'man' : 'lady'}!` });
  }

  private pageJson: any[] = [];

  private tagList = require('|/JsonEditor/tagList');

  private tags: string[] = ['请选择'];

  private unionTypeSelect: UnionTypeItem[] = [{}];

  // private configuration= require('|/JsonEditor/jsonConfig');
  private configuration: Configuration = {
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
        desc: '设置左上角文字，默认为上一级页面标题，一般不用填写',
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
        desc: '填入样式后，会对标题的默认样式进行覆盖',
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
      },
      src: {
        title: '图片地址',
        desc: '设置后会在段落文字底部展示所选图片',
        type: 'string',
        required: false
      },
      desc: {
        title: '图片描述文字',
        desc: '填入后会自动最前加入一个三角号，不填则没有描述文字',
        type: 'string',
        required: false
      },
      res: {
        title: '高清图片地址',
        desc: '需要高清图片时设置，会在预览图片是使用',
        type: 'string',
        required: false
      },
      imgmode: {
        title: '图片的显示模式',
        desc: '默认为widthFix',
        type: 'string',
        enum: [
          { label: 'widthFix', value: 'widthFix' },
          { label: 'scaleToFill', value: 'scaleToFill' },
          { label: 'aspectFit', value: 'aspectFit' },
          { label: 'aspectFill', value: 'aspectFill' },
          { label: 'top', value: 'top' },
          { label: 'bottom', value: 'bottom' },
          { label: 'left', value: 'left' },
          { label: 'right', value: 'right' },
          { label: 'center', value: 'center' },
          { label: 'top left', value: 'top left' },
          { label: 'top right', value: 'top right' },
          { label: 'bottom left', value: 'bottom left' },
          { label: 'bottom right', value: 'bottom right' }
        ],
        required: false,
        default: 'widthFix'
      },
      style: {
        title: '设置段落文字风格',
        desc: '填入css样式，会对段落的默认样式进行覆盖',
        type: 'string',
        required: false
      }
    },
    list: {
      foot: {
        title: '列表的结尾小标题',
        type: 'string',
        required: false
      },
      head: {
        title: '列表的的标题，不填会在标题所在处留空占位',
        desc: '设置为false来取消留空占位',
        type: ['string', 'boolean'],
        required: false
      }
    },
    img: {
      src: {
        title: '图片地址',
        desc: '设置后会在段落文字底部展示所选图片',
        type: 'string',
        required: true
      },
      desc: {
        title: '图片描述文字',
        desc: '填入后会自动最前加入一个三角号，不填则没有描述文字',
        type: 'string',
        required: false
      },
      res: {
        title: '高清图片地址',
        desc: '需要高清图片时设置，会在预览图片是使用',
        type: 'string',
        required: false
      },
      lazy: {
        title: '图片懒加载',
        desc: '默认执行lazyload，设置false取消',
        type: 'boolean',
        required: false,
        default: true
      },
      imgmode: {
        title: '图片的显示模式',
        desc: '默认为widthFix',
        type: 'string',
        enum: [
          { label: 'widthFix', value: 'widthFix' },
          { label: 'scaleToFill', value: 'scaleToFill' },
          { label: 'aspectFit', value: 'aspectFit' },
          { label: 'aspectFill', value: 'aspectFill' },
          { label: 'top', value: 'top' },
          { label: 'bottom', value: 'bottom' },
          { label: 'left', value: 'left' },
          { label: 'right', value: 'right' },
          { label: 'center', value: 'center' },
          { label: 'top left', value: 'top left' },
          { label: 'top right', value: 'top right' },
          { label: 'bottom left', value: 'bottom left' },
          { label: 'bottom right', value: 'bottom right' }
        ],
        required: false,
        default: 'widthFix'
      }
    },
    doc: {
      docName: {
        title: '文档名称',
        desc: '文档名称，需要使用“文件名.后缀”的格式，文件名不得包含“.”，后缀只支持doc、docx、ppt、pptx、xls、xlsx、pdf、jpg、jpeg、png、gif',
        type: 'string',
        required: true
      },
      url: {
        title: '文档在线路径',
        type: 'string',
        required: true
      }
    },
    phone: {
      num: {
        title: '电话号码',
        type: ['string', 'number'],
        required: true
      },
      fName: {
        title: '名字',
        desc: '小程序专用设置',
        type: 'string',
        required: true
      },
      lName: {
        title: '名字',
        desc: '小程序专用设置',
        type: 'string',
        required: false
      },
      org: {
        title: '所在公司',
        desc: '小程序专用设置',
        type: 'string',
        required: false
      },
      remark: {
        title: '备注',
        desc: '小程序专用设置',
        type: 'string',
        required: false
      },
      workNum: {
        title: '工作电话',
        desc: '小程序专用设置',
        type: ['string', 'number'],
        required: false
      },
      nickName: {
        title: '昵称',
        desc: '小程序专用设置',
        type: 'string',
        required: false
      },
      head: {
        title: '头像图片路径',
        desc: '小程序专用设置，仅限本地路径',
        type: 'string',
        required: false
      },
      wechat: {
        title: '微信号',
        desc: '小程序专用设置',
        type: 'string',
        required: false
      },
      province: {
        title: '省份',
        desc: '小程序专用设置',
        type: 'string',
        required: false
      },
      city: {
        title: '城市',
        desc: '小程序专用设置',
        type: 'string',
        required: false
      },
      street: {
        title: '街道',
        desc: '小程序专用设置',
        type: 'string',
        required: false
      },
      postCode: {
        title: '邮政编码',
        desc: '小程序专用设置',
        type: 'string',
        required: false
      },
      title: {
        title: '职位',
        desc: '小程序专用设置',
        type: 'string',
        required: false
      },
      hostNum: {
        title: '公司电话',
        desc: '小程序专用设置',
        type: ['string', 'number'],
        required: false
      },
      website: {
        title: '网站',
        desc: '小程序专用设置',
        type: 'string',
        required: false
      },
      email: {
        title: '电子邮件',
        desc: '小程序专用设置',
        type: 'string',
        required: false
      },
      homeNum: {
        title: '住宅电话',
        desc: '小程序专用设置',
        type: ['string', 'number'],
        required: false
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
