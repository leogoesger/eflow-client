import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Layout from '../components/hydrology/Layout';
import {
  fetchClassification,
  removeCurrentClass,
  fetchClassifications,
} from '../actions/classification';
import {
  fetchGauges,
  fetchCurrentGauge,
  removeCurrentGauge,
} from '../actions/gauge';
import {updateTab, updateHoveredGauge} from '../actions/hydrology';

export class Hydrology extends React.Component {
  componentWillMount() {
    this.props.fetchGauges();
    this.props.fetchClassifications();
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
        hoveredGauge={this.props.hoveredGauge}
        tabValue={this.props.tabValue}
        currentGauge={this.props.currentGauge}
        classifications={this.props.classifications}
        fetchCurrentGauge={gaugeId => this.props.fetchCurrentGauge(gaugeId)}
        currentClassification={this.props.currentClassification}
        fetchClassification={classId => this.props.fetchClassification(classId)}
        updateTab={tabValue => this.props.updateTab(tabValue)}
        removeClassGaugeProps={() => this.removeClassGaugeProps()}
        updateHoveredGauge={gaugeId => this.props.updateHoveredGauge(gaugeId)}
      />
    );
  }
}

Hydrology.propTypes = {
  fetchClassification: PropTypes.func,
  fetchGauges: PropTypes.func,
  fetchCurrentGauge: PropTypes.func,
  classifications: PropTypes.array,
  gauges: PropTypes.array,
  hoveredGauge: PropTypes.object,
  tabValue: PropTypes.string,
  updateTab: PropTypes.func,
  currentGauge: PropTypes.object,
  currentClassification: PropTypes.object,
  removeCurrentGauge: PropTypes.func,
  removeCurrentClass: PropTypes.func,
  fetchClassifications: PropTypes.func,
  updateHoveredGauge: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    tabValue: state.hydrology.tabValue,
    gauges: state.gauge.gauges,
    hoveredGauge: state.hydrology.hoveredGauge,
    classifications: state.classification.classifications,
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
    fetchClassifications: () => dispatch(fetchClassifications()),
    updateHoveredGauge: gaugeId => dispatch(updateHoveredGauge(gaugeId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hydrology);
