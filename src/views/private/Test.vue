<template>
  <div class="container">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="E-mail" v-bind="formItemLayout">
        <a-input
          v-decorator="[
          'email',
          {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }]
          }
        ]"
        />
      </a-form-item>
      <a-form-item label="Password" v-bind="formItemLayout">
        <a-input
          type="password"
          v-decorator="[
          'password',
          {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: validateToNextPassword,
            }],
          }
        ]"
        />
      </a-form-item>
      <a-form-item label="Confirm Password" v-bind="formItemLayout">
        <a-input
          @blur="handleConfirmBlur"
          type="password"
          v-decorator="[
          'confirm',
          {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: compareToFirstPassword,
            }],
          }
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <span slot="label">
          Nickname&nbsp;
          <a-tooltip title="What do you want others to call you?">
            <a-icon type="question-circle-o"/>
          </a-tooltip>
        </span>
        <a-input
          v-decorator="[
          'nickname',
          {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]
          }
        ]"
        />
      </a-form-item>
      <a-form-item label="Habitual Residence" v-bind="formItemLayout">
        <a-cascader
          :options="residences"
          v-decorator="[
          'residence',
          {
            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
          }
        ]"
        />
      </a-form-item>
      <a-form-item label="Phone Number" v-bind="formItemLayout">
        <a-input
          style="width: 100%"
          v-decorator="[
          'phone',
          {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          }
        ]"
        >
          <a-select
            slot="addonBefore"
            style="width: 70px"
            v-decorator="[
            'prefix',
            { initialValue: '86' }
          ]"
          >
            <a-select-option value="86">+86</a-select-option>
            <a-select-option value="87">+87</a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <a-form-item label="Website" v-bind="formItemLayout">
        <a-auto-complete
          @change="handleWebsiteChange"
          placeholder="website"
          v-decorator="[
          'website',
          {rules: [{ required: true, message: 'Please input website!' }]}
        ]"
        >
          <template slot="dataSource">
            <a-select-option :key="website" v-for="website in autoCompleteResult">{{ website }}</a-select-option>
          </template>
          <a-input/>
        </a-auto-complete>
      </a-form-item>
      <a-form-item
        extra="We must make sure that your are a human."
        label="Captcha"
        v-bind="formItemLayout"
      >
        <a-row :gutter="8">
          <a-col :span="12">
            <a-input
              v-decorator="[
              'captcha',
              {rules: [{ required: true, message: 'Please input the captcha you got!' }]}
            ]"
            />
          </a-col>
          <a-col :span="12">
            <a-button>Get captcha</a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-checkbox v-decorator="['agreement', {valuePropName: 'checked'}]">
          I have read the
          <a href>agreement</a>
        </a-checkbox>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button html-type="submit" type="primary">Register</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

export default {
  data() {
    return {
      confirmDirty: false,
      residences,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.autoCompleteResult = autoCompleteResult;
    },
  },
};
</script>
