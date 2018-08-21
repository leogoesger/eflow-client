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
  getYaxisMax,
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
        {'Search gauges by Site ID or Station Name.'}
      </div>
    ),
    position: 'bottom',
  },
  {
    step: 2,
    selector: '.tour-metricDetail-navbar',
    title: <div className="tour-title">Navigation Bar</div>,
    body: (
      <div className="tour-body">
        {'All gauges are listed within their class in the navigation bar.'}
        <div className="tour-warning">
          {'Overview will take you to the box plot summary for all classes.'}
        </div>
      </div>
    ),
    position: 'bottom',
  },
  {
    step: 3,
    selector: '.tour-metricDetail-navbar',
    title: <div className="tour-title">Click on a Gauge!</div>,
    body: (
      <div className="tour-body">
        {
          'Make sure to click on a gauge from the dropdown menu to see instructions for the next step.'
        }
      </div>
    ),
    position: 'top',
  },
  {
    step: 4,
    selector: '.tour-metricDetail-slider',
    title: <div className="tour-title">Annual Hydrograph Slider</div>,
    body: (
      <div className="tour-body">
        {
          'Drag the circle back and forth to see annual hydrographs for each water year.'
        }
        <div className="tour-warning">
          {'Once you click the circle, use the arrow keys to change the year!'}
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
        {
          'Check here to see whether the current water year is impaired or unimpaired.'
        }
        <div className="tour-warning">
          {'Only unimpaired water years have calculated metrics!'}
        </div>
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
        {'Click here to download flow data for the gauge or metric results.'}
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
          'Clicking here will open a bar which allows you to toggle metric results over the hydrograph.'
        }
        <div className="tour-warning">
          {'Toggle DRHs, metric results, or change to log scale!'}
        </div>
      </div>
    ),
    position: 'left',
  },
  {
    step: 8,
    selector: '.tour-hydrology',
    title: <div className="tour-title">Back to Hydrology Home Page</div>,
    body: (
      <div className="tour-body">
        {'Return to the hydrology home page with the currently selected gauge.'}
        <div className="tour-warning">
          {
            'If there is a gauge currently displayed, its DRH will show up on the hydrology page!'
          }
        </div>
      </div>
    ),
    position: 'bottom',
  },
];

export class MetricDetail extends React.Component {
  componentDidMount() {
    document.title = 'eFlows | Detail';
    if (!this.props.classifications) {
      this.props.fetchClassifications();
    }
    if (this.props.currentGauge) {
      this.props.fetchAnnualFlowData({gaugeId: this.props.currentGauge.id});
      this.props.fetchHydrographOverlay(this.props.currentGauge.id);
      if (this.props.fixedYaxisPercentile) {
        this.props.getYaxisMax(
          this.props.currentGauge.id,
          this.props.fixedYaxisPercentile
        );
      }
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
              yMax={this.props.yMax}
              getYaxisMax={(id, percentile) =>
                this.props.getYaxisMax(id, percentile)
              }
              fixedYaxisPercentile={this.props.fixedYaxisPercentile}
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
  yMax: PropTypes.number,
  getYaxisMax: PropTypes.func,
  fixedYaxisPercentile: PropTypes.number,
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
    yMax: state.metricDetail.yMax,
    fixedYaxisPercentile: state.metricDetail.fixedYaxis,
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
    getYaxisMax: (id, percentile) => dispatch(getYaxisMax(id, percentile)),
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
