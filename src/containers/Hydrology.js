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
import {fetchFallData, removeFallData} from '../actions/fall';
import {fetchSpringData, removeSpringData} from '../actions/spring';
import {fetchSummerData, removeSummerData} from '../actions/summer';

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
        fetchFallData={data => this.props.fetchFallData(data)}
        removeFallData={data => this.props.removeFallData(data)}
        fetchSpringData={data => this.props.fetchSpringData(data)}
        removeSpringData={data => this.props.removeSpringData(data)}
        fetchSummerData={data => this.props.fetchSummerData(data)}
        removeSummerData={data => this.props.removeSummerData(data)}
        fallData={this.props.fallData}
        springData={this.props.springData}
        summerData={this.props.summerData}
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
  fetchFallData: PropTypes.func,
  removeFallData: PropTypes.func,
  fetchSpringData: PropTypes.func,
  removeSpringData: PropTypes.func,
  fetchSummerData: PropTypes.func,
  removeSummerData: PropTypes.func,
  fallData: PropTypes.array,
  springData: PropTypes.array,
  summerData: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    tabValue: state.hydrology.tabValue,
    gauges: state.gauge.gauges,
    hoveredGauge: state.hydrology.hoveredGauge,
    classifications: state.classification.classifications,
    currentGauge: state.gauge.currentGauge,
    currentClassification: state.classification.currentClassification,
    fallData: state.fall.fallData,
    springData: state.spring.springData,
    summerData: state.summer.summerData,
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
    fetchFallData: data => dispatch(fetchFallData(data)),
    removeFallData: data => dispatch(removeFallData(data)),
    fetchSpringData: data => dispatch(fetchSpringData(data)),
    removeSpringData: data => dispatch(removeSpringData(data)),
    fetchSummerData: data => dispatch(fetchSummerData(data)),
    removeSummerData: data => dispatch(removeSummerData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hydrology);
