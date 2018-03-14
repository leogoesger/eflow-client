import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  fetchClassification,
  removeCurrentClass,
} from '../actions/classification';
import {
  fetchGauges,
  fetchCurrentGauge,
  removeCurrentGauge,
} from '../actions/gauge';
import {updateTab} from '../actions/hydrology';
import Layout from '../components/hydrology/Layout';

export class Hydrology extends React.Component {
  componentWillMount() {
    this.props.fetchGauges();
  }

  removeClassGaugeProps() {
    this.props.removeCurrentGauge();
    this.props.removeCurrentClass();
    this.props.updateTab('a');
  }

  render() {
    return (
      <Layout
        gauges={this.props.gauges}
        tabValue={this.props.tabValue}
        currentGauge={this.props.currentGauge}
        fetchCurrentGauge={gaugeId => this.props.fetchCurrentGauge(gaugeId)}
        currentClassification={this.props.currentClassification}
        fetchClassification={classId => this.props.fetchClassification(classId)}
        updateTab={tabValue => this.props.updateTab(tabValue)}
        removeClassGaugeProps={() => this.removeClassGaugeProps()}
      />
    );
  }
}

Hydrology.propTypes = {
  fetchClassification: PropTypes.func,
  fetchGauges: PropTypes.func,
  fetchCurrentGauge: PropTypes.func,
  gauges: PropTypes.array,
  tabValue: PropTypes.string,
  updateTab: PropTypes.func,
  currentGauge: PropTypes.object,
  currentClassification: PropTypes.object,
  removeCurrentGauge: PropTypes.func,
  removeCurrentClass: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    tabValue: state.hydrology.tabValue,
    gauges: state.gauge.gauges,
    currentGauge: state.gauge.currentGauge,
    currentClassification: state.classification.currentClassification,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchClassification: classId => dispatch(fetchClassification(classId)),
    fetchGauges: () => dispatch(fetchGauges()),
    fetchCurrentGauge: gaugeId => dispatch(fetchCurrentGauge(gaugeId)),
    updateTab: tabValue => dispatch(updateTab(tabValue)),
    removeCurrentGauge: () => dispatch(removeCurrentGauge()),
    removeCurrentClass: () => dispatch(removeCurrentClass()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hydrology);
