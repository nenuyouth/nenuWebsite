/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: babel配置
 * @Date: 2019-02-24 22:21:21
 * @LastEditTime: 2019-03-14 19:17:20
 */
module.exports = {
  plugins: [
    [
      'import',
      { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }
    ]
  ],
  presets: ['@vue/app']
};
