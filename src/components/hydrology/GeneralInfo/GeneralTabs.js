import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import {Colors} from '../../../styles';
import ClassSummary from './ClassSummary';
import GaugeSummary from './GaugeSummary';

class GeneralTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: 400,
      value: 'a',
    };
  }

  handleChange(value) {
    this.setState({
      value: value,
    });
  }

  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={value => this.handleChange(value)}
        tabItemContainerStyle={{
          backgroundColor: Colors.blue,
          borderTopLeftRadius: '2px',
          borderTopRightRadius: '2px',
        }}
        inkBarStyle={{backgroundColor: Colors.gold}}
      >
        <Tab label="Class" value="a">
          <ClassSummary />
        </Tab>
        <Tab label="Gauge" value="b">
          <GaugeSummary />
        </Tab>
      </Tabs>
    );
  }
}

GeneralTabs.propTypes = {};

export default GeneralTabs;
