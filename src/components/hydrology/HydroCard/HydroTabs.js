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
      summaryData: null,
    };
  }

  componentDidMount() {
    this._setContainerWidth();
    window.addEventListener('resize', () => this._setContainerWidth());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this._setContainerWidth());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentGauge || nextProps.currentClassification) {
      this._getSummaryData(nextProps);
    }
  }

  _getSummaryData(nextProps) {
    let summaryData = {};
    if (nextProps.currentGauge) {
      summaryData = nextProps.currentGauge;
    } else {
      summaryData = nextProps.currentClassification;
    }
    this.setState({summaryData: summaryData});
  }

  _setContainerWidth() {
    this.setState({containerWidth: window.innerWidth / 2.7});
  }

  _handleChange(tabValue) {
    this.props.updateTab(tabValue);
  }

  _disabledBtn() {
    return Boolean(this.props.currentGauge || this.props.currentClassification);
  }

  render() {
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
        <Tab label="Data" value="a">
          <HydroInfo
            currentClassification={this.props.currentClassification}
            currentGauge={this.props.currentGauge}
            summaryData={this.state.summaryData}
            removeClassGaugeProps={() => this.props.removeClassGaugeProps()}
            classifications={this.props.classifications}
            updateHoveredGauge={gaugeId =>
              this.props.updateHoveredGauge(gaugeId)
            }
            fetchCurrentGauge={gaugeId => this.props.fetchCurrentGauge(gaugeId)}
            fetchClassification={classId =>
              this.props.fetchClassification(classId)
            }
          />
        </Tab>
        <Tab
          label="Hydrograph"
          value="b"
          disabled={!this._disabledBtn()}
          style={this._disabledBtn() ? null : {cursor: 'not-allowed'}}
        >
          <Hydrograph
            containerWidth={this.state.containerWidth}
            currentClassification={this.props.currentClassification}
            currentGauge={this.props.currentGauge}
            summaryData={this.state.summaryData}
            removeClassGaugeProps={() => this.props.removeClassGaugeProps()}
            overLayBoxPlotMethods={this.props.overLayBoxPlotMethods}
            overLayBoxPlotData={this.props.overLayBoxPlotData}
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
  removeClassGaugeProps: PropTypes.func,
  classifications: PropTypes.array,
  updateHoveredGauge: PropTypes.func,
  fetchCurrentGauge: PropTypes.func,
  fetchClassification: PropTypes.func,
  overLayBoxPlotMethods: PropTypes.object,
  overLayBoxPlotData: PropTypes.array,
};

export default HydroTabs;
