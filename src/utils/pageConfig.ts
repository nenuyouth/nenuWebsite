/*
 * @Author: Mr.Hope
 * @Date: 2019-06-03 12:31:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-06-03 12:45:04
 * @Description: Page Json Config
 */

interface EnumConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  label: string;
}

export interface Config {
  title: string;
  desc?: string;
  type: string | string[];
  required: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default?: any;
  enum?: EnumConfig[];
  element?: string[] | string;
  step?: number;
}

export default Config;
