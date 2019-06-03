/*
 * @Author: Mr.Hope
 * @Date: 2019-06-03 12:31:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-06-03 12:45:04
 * @Description: Page Json Config
 */

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

export default Config;
