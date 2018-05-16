import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchClassifications} from '../actions/classification';
import {removeCurrentGauge} from '../actions/gauge';
import {
  fetchAllClassesBoxPlots,
  fetchAnnualFlowData,
  toggleMetricGaugeDrawer,
  fetchHydrographOverlay,
} from '../actions/metricDetail';
import Layout from '../components/metricDetail/Layout';
import ErrorBoundary from '../components/shared/ErrorBoundary';

export class MetricDetail extends React.Component {
  componentWillMount() {
    if (!this.props.classifications) {
      this.props.fetchClassifications();
    }
    if (this.props.currentGauge) {
      this.props.fetchAnnualFlowData({gaugeId: this.props.currentGauge.id});
      this.props.fetchHydrographOverlay(this.props.currentGauge.id);
    }
    this.removeClassGaugeProps();
  }

  componentWillUnmount() {
    this.props.fetchAnnualFlowData(null);
    this.props.toggleMetricGaugeDrawer(false);
  }

  removeClassGaugeProps() {
    this.props.removeCurrentGauge();
  }

  render() {
    return (
      <React.Fragment>
        <div style={styles.banner} />
        <ErrorBoundary>
          <Layout
            annualFlowData={this.props.annualFlowData}
            classifications={this.props.classifications}
            fetchAllClassesBoxPlots={() => this.props.fetchAllClassesBoxPlots()}
            allClassesBoxPlots={this.props.allClassesBoxPlots}
            loading={this.props.loading}
            fetchAnnualFlowData={d => this.props.fetchAnnualFlowData(d)}
            toggleMetricGaugeDrawer={status =>
              this.props.toggleMetricGaugeDrawer(status)
            }
            logScale={this.props.logScale}
            toggledMetrics={this.props.toggledMetrics}
            isHydrographOverlay={this.props.isHydrographOverlay}
            hydrograph={this.props.hydrograph}
            fetchHydrographOverlay={d => this.props.fetchHydrographOverlay(d)}
          />
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}

MetricDetail.propTypes = {
  removeCurrentGauge: PropTypes.func,
  fetchClassifications: PropTypes.func,
  fetchAllClassesBoxPlots: PropTypes.func,
  fetchAnnualFlowData: PropTypes.func,
  classifications: PropTypes.array,
  currentGauge: PropTypes.object,
  annualFlowData: PropTypes.object,
  allClassesBoxPlots: PropTypes.object,
  loading: PropTypes.bool,
  logScale: PropTypes.bool,
  toggledMetrics: PropTypes.array,
  toggleMetricGaugeDrawer: PropTypes.func,
  isHydrographOverlay: PropTypes.bool,
  fetchHydrographOverlay: PropTypes.func,
  hydrograph: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    classifications: state.classification.classifications,
    currentGauge: state.gauge.currentGauge,
    annualFlowData: state.metricDetail.annualFlowData,
    allClassesBoxPlots: state.metricDetail.boxPlotData,
    loading: state.metricDetail.loading,
    toggledMetrics: state.metricDetail.toggledMetrics,
    logScale: state.metricDetail.logScale,
    isHydrographOverlay: state.metricDetail.isHydrographOverlay,
    hydrograph: state.metricDetail.hydrograph,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchClassifications: () => dispatch(fetchClassifications()),
    removeCurrentGauge: () => dispatch(removeCurrentGauge()),
    fetchAllClassesBoxPlots: () => dispatch(fetchAllClassesBoxPlots()),
    fetchAnnualFlowData: d => dispatch(fetchAnnualFlowData(d)),
    toggleMetricGaugeDrawer: status =>
      dispatch(toggleMetricGaugeDrawer(status)),
    fetchHydrographOverlay: d => dispatch(fetchHydrographOverlay(d)),
  };
};

const styles = {
  banner: {
    backgroundColor: '#424242',
    height: '230px',
    zIndex: '0',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(MetricDetail);
