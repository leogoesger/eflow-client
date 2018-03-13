import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'material-ui/Tabs';

import {Colors} from '../../styles';
import Hydrograph from './Hydrograph';
import HydroInfo from './HydroInfo';

class HydroTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: 400,
      value: 'a',
    };
  }

  componentDidMount() {
    this._setContainerWidth();
    window.addEventListener('resize', () => this._setContainerWidth());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this._setContainerWidth());
  }

  _setContainerWidth() {
    this.setState({containerWidth: window.innerWidth / 2.7});
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
        <Tab label="Info" value="a">
          <HydroInfo />
        </Tab>
        <Tab label="Plot" value="b">
          <Hydrograph
            containerWidth={this.state.containerWidth}
            data={this.props.DRHdata}
          />
        </Tab>
      </Tabs>
    );
  }
}

HydroTabs.propTypes = {
  DRHdata: PropTypes.array.isRequired,
};

export default HydroTabs;
