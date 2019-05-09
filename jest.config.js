/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: Jest配置文件
 * @Date: 2019-05-05 16:03:08
 * @LastEditTime: 2019-05-09 10:21:07
 */

module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
    'ts',
    'tsx'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'],
  testURL: 'http://localhost/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  globals: { 'ts-jest': { babelConfig: true } }
};
