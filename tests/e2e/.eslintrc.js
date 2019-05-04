/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: eslint配置文件
 * @Date: 2019-05-04 11:11:17
 * @LastEditTime: 2019-05-04 11:15:18
 */
module.exports = {
  plugins: [
    'cypress'
  ],
  env: {
    mocha: true,
    'cypress/globals': true
  },
  rules: {
    strict: 'off'
  }
};
