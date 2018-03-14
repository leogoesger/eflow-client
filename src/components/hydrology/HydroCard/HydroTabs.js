import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'material-ui/Tabs';

import {Colors} from '../../../styles';
import Hydrograph from './Hydrograph';
import HydroInfo from './HydroInfo';

class HydroTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: 400,
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

  _handleChange(tabValue) {
    this.props.updateTab(tabValue);
  }

  render() {
    if (!this.props.currentClassification && !this.props.currentGauge) {
      return null;
    }
    return (
      <Tabs
        value={this.props.tabValue}
        onChange={tabValue => this._handleChange(tabValue)}
        tabItemContainerStyle={{
          backgroundColor: Colors.blue,
          borderTopLeftRadius: '2px',
          borderTopRightRadius: '2px',
        }}
        inkBarStyle={{backgroundColor: Colors.gold}}
      >
        <Tab label="Info" value="a">
          <HydroInfo
            currentClassification={this.props.currentClassification}
            currentGauge={this.props.currentGauge}
          />
        </Tab>
        <Tab label="Plot" value="b">
          <Hydrograph
            containerWidth={this.state.containerWidth}
            currentClassification={this.props.currentClassification}
            currentGauge={this.props.currentGauge}
          />
        </Tab>
      </Tabs>
    );
  }
}

HydroTabs.propTypes = {
  tabValue: PropTypes.string,
  updateTab: PropTypes.func,
  currentGauge: PropTypes.object,
  currentClassification: PropTypes.object,
};

export default HydroTabs;
