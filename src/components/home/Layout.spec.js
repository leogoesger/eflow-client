import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import Layout from './Layout';

describe('<Layout />', () => {
  it('Render Layout', () => {
    const wrapper = shallow(<Layout />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
