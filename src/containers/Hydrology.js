import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Layout from '../components/hydrology/Layout';
import {updateTab, updateHoveredGauge} from '../actions/hydrology';
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
import {fetchFallBoxPlotData, removeFallBoxPlotData} from '../actions/fall';
import {
  fetchSpringBoxPlotData,
  removeSpringBoxPlotData,
} from '../actions/spring';
import {
  fetchSummerBoxPlotData,
  removeSummerBoxPlotData,
} from '../actions/summer';
import {
  fetchWinterBoxPlotData,
  removeWinterBoxPlotData,
} from '../actions/winter';

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

  getBoxPlotOverlayData() {
    return [
      this.props.fallTimingBoxPlot,
      this.props.fallTimingWetBoxPlot,
      this.props.springTimingBoxPlot,
      this.props.summerTimingBoxPlot,
    ].filter(d => d);
  }

  getVerticalBoxPlotOverlayData() {
    return [
      this.props.springMagnitudeBoxPlot,
      this.props.winterMagnitude2BoxPlot,
      this.props.winterMagnitude5BoxPlot,
      this.props.winterMagnitude10BoxPlot,
      this.props.winterMagnitude20BoxPlot,
      this.props.summerMagnitude10BoxPlot,
      this.props.summerMagnitude50BoxPlot,
      this.props.fallMagnitudeBoxPlot,
    ].filter(d => d);
  }

  getBoxPlotOverlayMethods() {
    return {
      fetchFallBoxPlotData: d => this.props.fetchFallBoxPlotData(d),
      removeFallBoxPlotData: d => this.props.removeFallBoxPlotData(d),
      fetchSpringBoxPlotData: d => this.props.fetchSpringBoxPlotData(d),
      removeSpringBoxPlotData: d => this.props.removeSpringBoxPlotData(d),
      fetchSummerBoxPlotData: d => this.props.fetchSummerBoxPlotData(d),
      removeSummerBoxPlotData: d => this.props.removeSummerBoxPlotData(d),
      fetchWinterBoxPlotData: d => this.props.fetchWinterBoxPlotData(d),
      removeWinterBoxPlotData: d => this.props.removeWinterBoxPlotData(d),
    };
  }

  render() {
    return (
      <React.Fragment>
        <div style={styles.banner} />
        <Layout
          gauges={this.props.gauges}
          hoveredGauge={this.props.hoveredGauge}
          tabValue={this.props.tabValue}
          currentGauge={this.props.currentGauge}
          classifications={this.props.classifications}
          fetchCurrentGauge={gaugeId => this.props.fetchCurrentGauge(gaugeId)}
          currentClassification={this.props.currentClassification}
          fetchClassification={classId =>
            this.props.fetchClassification(classId)
          }
          updateTab={tabValue => this.props.updateTab(tabValue)}
          removeClassGaugeProps={() => this.removeClassGaugeProps()}
          updateHoveredGauge={gaugeId => this.props.updateHoveredGauge(gaugeId)}
          overLayBoxPlotMethods={this.getBoxPlotOverlayMethods()}
          overLayBoxPlotData={this.getBoxPlotOverlayData()}
          verticalOverlayBoxPlotData={this.getVerticalBoxPlotOverlayData()}
        />
      </React.Fragment>
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
  fetchFallBoxPlotData: PropTypes.func,
  removeFallBoxPlotData: PropTypes.func,
  fetchSpringBoxPlotData: PropTypes.func,
  removeSpringBoxPlotData: PropTypes.func,
  fetchSummerBoxPlotData: PropTypes.func,
  removeSummerBoxPlotData: PropTypes.func,
  fetchWinterBoxPlotData: PropTypes.func,
  removeWinterBoxPlotData: PropTypes.func,
  fallTimingBoxPlot: PropTypes.object,
  fallTimingWetBoxPlot: PropTypes.object,
  springTimingBoxPlot: PropTypes.object,
  summerTimingBoxPlot: PropTypes.object,
  springMagnitudeBoxPlot: PropTypes.object,
  winterMagnitude2BoxPlot: PropTypes.object,
  winterMagnitude5BoxPlot: PropTypes.object,
  winterMagnitude10BoxPlot: PropTypes.object,
  winterMagnitude20BoxPlot: PropTypes.object,
  summerMagnitude10BoxPlot: PropTypes.object,
  summerMagnitude50BoxPlot: PropTypes.object,
  fallMagnitudeBoxPlot: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    tabValue: state.hydrology.tabValue,
    gauges: state.gauge.gauges,
    hoveredGauge: state.hydrology.hoveredGauge,
    classifications: state.classification.classifications,
    currentGauge: state.gauge.currentGauge,
    currentClassification: state.classification.currentClassification,
    fallTimingBoxPlot: state.fall.timingBoxPlot,
    fallTimingWetBoxPlot: state.fall.timingWetBoxPlot,
    springTimingBoxPlot: state.spring.timingBoxPlot,
    summerTimingBoxPlot: state.summer.timingBoxPlot,
    springMagnitudeBoxPlot: state.spring.magnitudeBoxPlot,
    winterMagnitude2BoxPlot: state.winter.magnitude2BoxPlot,
    winterMagnitude5BoxPlot: state.winter.magnitude5BoxPlot,
    winterMagnitude10BoxPlot: state.winter.magnitude10BoxPlot,
    winterMagnitude20BoxPlot: state.winter.magnitude20BoxPlot,
    summerMagnitude10BoxPlot: state.summer.magnitude10BoxPlot,
    summerMagnitude50BoxPlot: state.summer.magnitude50BoxPlot,
    fallMagnitudeBoxPlot: state.fall.magnitudeBoxPlot,
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
    fetchFallBoxPlotData: data => dispatch(fetchFallBoxPlotData(data)),
    removeFallBoxPlotData: data => dispatch(removeFallBoxPlotData(data)),
    fetchSpringBoxPlotData: data => dispatch(fetchSpringBoxPlotData(data)),
    removeSpringBoxPlotData: data => dispatch(removeSpringBoxPlotData(data)),
    fetchSummerBoxPlotData: data => dispatch(fetchSummerBoxPlotData(data)),
    removeSummerBoxPlotData: data => dispatch(removeSummerBoxPlotData(data)),
    fetchWinterBoxPlotData: data => dispatch(fetchWinterBoxPlotData(data)),
    removeWinterBoxPlotData: data => dispatch(removeWinterBoxPlotData(data)),
  };
};

const styles = {
  banner: {
    backgroundColor: '#424242',
    height: '230px',
    zIndex: '0',
  },
};
export default connect(mapStateToProps, mapDispatchToProps)(Hydrology);
