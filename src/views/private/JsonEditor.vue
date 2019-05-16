<template>
  <div class="container">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="Note">
        <a-input
          v-decorator="[
          'note',
          {rules: [{ required: true, message: 'Please input your note!' }]}
        ]"
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
    <template v-for="(part,partIndex) in pageJson">
      <a-divider :key="partIndex" orientation="left">
        <a-dropdown>
          <a class="ant-dropdown-link">
            {{part.tag}}
            <a-icon type="down"/>
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item disabled v-text="'完全支持'"/>
              <a-menu-item
                :key="`finish${index}`"
                @click="setTag(partIndex,index,0)"
                v-for="(item,index) in tagList[0]"
                v-text="item[0]"
              />
              <a-menu-divider/>
              <a-menu-item disabled v-text="'仅小程序'"/>
              <a-menu-item
                :key="`unfinish${index}`"
                @click="setTag(partIndex,index,1)"
                v-for="(item,index) in tagList[1]"
                v-text="item[0]"
              />
            </a-menu>
          </template>
        </a-dropdown>
      </a-divider>
      <template v-if="part.tag!=='请选择'">
        <template v-for="config in Object.keys(configuration[part.tag])">
          <div :key="`${config}title`" class="title">
            {{configuration[part.tag][config].desc}}：
            <span
              class="titleDesc"
              v-text="configuration[part.tag][config].remark ? `（${configuration[part.tag][config].remark}）` : ''"
            ></span>
          </div>
          <template v-if="typeof configuration[part.tag][config].type==='object'">复合类型编辑正在制作中</template>
          <template v-else>
            <a-radio-group
              :defaultValue="configuration[part.tag][config].default"
              :key="config"
              :options=" [{ label: '是', value: true }, { label: '否', value: false }]"
              :value="pageJson[partIndex][config]"
              v-if="configuration[part.tag][config].type===Boolean"
            />
            <a-textarea
              :key="config"
              :placeholder="configuration[part.tag][config].required?'必填':'选填'"
              autosize
              v-else-if="configuration[part.tag][config].type===String&&configuration[part.tag][config].lineBreak"
              v-model="pageJson[partIndex][config]"
            />
            <a-input
              :key="config"
              :placeholder="configuration[part.tag][config].required?'必填':'选填'"
              v-else-if="configuration[part.tag][config].type===String&&!configuration[part.tag][config].lineBreak"
              v-model="pageJson[partIndex][config]"
            />
          </template>
        </template>
      </template>
    </template>
    <div>
      <a-button @click="addComponent" class="addNewBtn" type="primary">
        <a-icon type="plus"/>新增
      </a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class JsonEditor extends Vue {
  private form: any = '';
  // private form = this.$form.createForm(this);

  private tagList = [
    [
      ['页面标题', 'head'],
      ['标题', 'title'],
      ['段落', 'p'],
      ['图片', 'img'],
      ['列表', 'list'],
      ['页脚', 'foot'],
      ['网格', 'grid'],
      ['电话', 'phone']
    ],
    [['文档', 'doc'], ['公众号', 'gzh'], ['音频', 'audio'], ['视频', 'video'], ['轮播图', 'swiper']]
  ];

  private pageJson: any[] = [{ tag: '请选择' }];

  // private configuration= require('~/jsonConfig');
  private configuration = {
    head: {
      title: {
        required: true,
        desc: '页面标题',
        type: String
      },
      desc: {
        required: false,
        desc: '标题描述文字',
        remark: '该文字只在特定主题下展示',
        lineBreak: true,
        type: String
      },
      action: {
        required: false,
        remark: '不填时默认执行返回，设置为true来隐藏默认的返回按钮',
        desc: '左上角按钮触发的函数名称',
        type: [String, Boolean]
      },
      grey: {
        required: false,
        remark: '默认为白色背景',
        desc: '是否使用灰色背景',
        default: false,
        type: Boolean
      },
      display: {
        required: false,
        desc: '是否隐藏head',
        default: false,
        type: Boolean
      },
      shareable: {
        required: false,
        desc: '界面是否可以被分享',
        default: false,
        type: Boolean
      },
      contact: {
        required: false,
        desc: '显示“联系开发者”按钮',
        default: false,
        type: Boolean
      },
      feedback: {
        required: false,
        desc: '显示“意见反馈”按钮',
        default: false,
        type: Boolean
      }
    },
    title: {
      text: {
        required: true,
        desc: '大标题文字',
        lineBreak: true,
        type: String
      },
      style: {
        required: false,
        desc: '标题css样式',
        type: String
      }
    },
    p: {
      text: {
        required: true,
        desc: '段落的文字',
        lineBreak: true,
        type: String
      },
      head: {
        required: false,
        desc: '段落标题',
        remark: '填入true会在留空占位',
        type: [String, Boolean]
      },
      align: {
        required: false,
        default: 'left',
        enum: ['left', 'center', 'right', 'justify'],
        desc: '段落对齐方式',
        remark: '填入true会在留空占位',
        type: String
      }
    }
  };

  // Add a new component in the end
  private addComponent() {
    this.pageJson.push({ tag: '请选择' });
  }

  // Set the tag value when clicking on the dropdown items
  private setTag(partIndex: number, index: number, list: number) {
    this.pageJson[partIndex].tag = this.tagList[list][index][1];
  }

  /*
   * Check type for JSON
   * private typeCheck() {}
   */

  private created() {
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
}
</script>
<style scoped>
.title {
  /* font-size: 16px; */
  padding: 8px 15px 4px 15px;
}
.titleDesc {
  font-size: 13px;
  color: #888;
}
.addNewBtn {
  border-radius: 16px;
}
</style>
