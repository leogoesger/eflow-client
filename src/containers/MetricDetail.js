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
import UserTour from '../components/shared/UserTour';

const metricDetailTourSteps = [
  {
    step: 1,
    selector: '.tour-searchBar',
    title: <div className="tour-title">Search Bar</div>,
    body: (
      <div className="tour-body">
        {'Search by site ID or station name!'}
        <div className="tour-warning">
          {'If site ID is 12345, you can search with 45 or 23!'}
        </div>
      </div>
    ),
    position: 'bottom',
  },
  {
    step: 2,
    selector: '.tour-metricDetail-navbar',
    title: <div className="tour-title">Navigation bar</div>,
    body: (
      <div className="tour-body">
        {'All the gauges are listed within their class in the navigation bar!'}
        <div className="tour-warning">
          {'Overview will take you to all the boxplots'}
        </div>
      </div>
    ),
    position: 'bottom',
  },
  {
    step: 3,
    selector: '.tour-metricDetail-navbar',
    title: <div className="tour-title">Click on a gauge!</div>,
    body: (
      <div className="tour-body">
        {'Click on a gauge from the dropdown menu to proceed to next step!'}
        <div className="tour-warning">{'Important!'}</div>
      </div>
    ),
    position: 'top',
  },
  {
    step: 4,
    selector: '.tour-metricDetail-slider',
    title: <div className="tour-title">Annual Flow Slider</div>,
    body: (
      <div className="tour-body">
        {'Drag the ball around to see annual flow data at different year!'}
        <div className="tour-warning">
          {'Once you click the ball, use arrow key to change the year!'}
        </div>
      </div>
    ),
    position: 'top',
  },
  {
    step: 5,
    selector: '.tour-metricDetail-impairedStatus',
    title: <div className="tour-title">Flow Status</div>,
    body: (
      <div className="tour-body">
        {'This shows whether current year is impaired or un-impaired!'}
      </div>
    ),
    position: 'left',
  },
  {
    step: 6,
    selector: '.tour-metricDetail-download',
    title: <div className="tour-title">Download</div>,
    body: (
      <div className="tour-body">
        {'Click to download either flow data for the gauge or metric result!'}
      </div>
    ),
    position: 'bottom',
  },
  {
    step: 7,
    selector: '.tour-metricDetail-display',
    title: <div className="tour-title">Display</div>,
    body: (
      <div className="tour-body">
        {
          'Click this will open a bar to the right which will allow you to toggle layers on top of the gauge.'
        }
        <div className="tour-warning">
          {'Toggle DRHs, metric results, and change to log scale!'}
        </div>
      </div>
    ),
    position: 'left',
  },
  {
    step: 8,
    selector: '.tour-hydrology',
    title: <div className="tour-title">Back to Hydrology</div>,
    body: (
      <div className="tour-body">
        {'Back to hydrology page with current selected gauge!'}
        <div className="tour-warning">
          {
            'If there is a gauge displayed, its DRH will show up in hydrology page!'
          }
        </div>
      </div>
    ),
    position: 'bottom',
  },
];

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
        <UserTour tourSteps={metricDetailTourSteps} />
        <div>
          <div style={styles.banner} />
          <ErrorBoundary>
            <Layout
              annualFlowData={this.props.annualFlowData}
              classifications={this.props.classifications}
              fetchAllClassesBoxPlots={() =>
                this.props.fetchAllClassesBoxPlots()
              }
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
        </div>
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
