/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: babel配置
 * @Date: 2019-02-24 22:21:21
 * @LastEditTime: 2019-05-09 10:21:21
 */

module.exports = {
  plugins: [
    [
      'import',
      { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }
    ]
  ],
  presets: ['@vue/cli-plugin-babel/preset']
};
