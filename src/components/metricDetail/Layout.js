import React from 'react';
import PropTypes from 'prop-types';
import MetricNavbar from './MetricNavbar';
import MetricOverviewCard from './MetricOverviewCard';
import MetricGaugeCard from './MetricGaugeCard';

export default class Layout extends React.Component {
  _renderDetailCard() {
    if (this.props.annualFlowData) {
      return (
        <MetricGaugeCard
          annualFlowData={this.props.annualFlowData}
          fetchAnnualFlowData={d => this.props.fetchAnnualFlowData(d)}
          toggleMetricGaugeDrawer={status =>
            this.props.toggleMetricGaugeDrawer(status)
          }
        />
      );
    } else {
      return (
        <MetricOverviewCard
          fetchAllClassesBoxPlots={() => this.props.fetchAllClassesBoxPlots()}
          loading={this.props.loading}
          allClassesBoxPlots={this.props.allClassesBoxPlots}
        />
      );
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <MetricNavbar
          classifications={this.props.classifications}
          fetchAnnualFlowData={d => this.props.fetchAnnualFlowData(d)}
        />
        {this._renderDetailCard()}
      </div>
    );
  }
}

Layout.propTypes = {
  fetchAnnualFlowData: PropTypes.func,
  classifications: PropTypes.array,
  annualFlowData: PropTypes.object,
  fetchAllClassesBoxPlots: PropTypes.func,
  loading: PropTypes.bool,
  allClassesBoxPlots: PropTypes.object,
  toggleMetricGaugeDrawer: PropTypes.func,
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '-60px auto 100px auto',
    height: '600px',
    overflow: 'scroll',
    width: '1200px',
  },
};
