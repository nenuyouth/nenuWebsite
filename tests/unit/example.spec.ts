/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 测试案例
 * @Date: 2019-05-07 12:04:08
 * @LastEditTime: 2019-05-07 19:42:56
 */

import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, { propsData: { msg } });

    expect(wrapper.text()).to.include(msg);
  });
});
