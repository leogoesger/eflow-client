import React from 'react';
import PropTypes from 'prop-types';
import MetricNavbar from './MetricNavbar';
import MetricOverviewCard from './MetricOverviewCard';
import MetricClassCard from './MetricClassCard';
import MetricGaugeCard from './MetricGaugeCard';

export default class Layout extends React.Component {
  _renderDetailCard() {
    if (this.props.currentGauge) {
      return <MetricGaugeCard />;
    } else if (this.props.currentClassification) {
      return <MetricClassCard />;
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
          removeClassGaugeProps={() => this.props.removeClassGaugeProps()}
        />
        {this._renderDetailCard()}
      </div>
    );
  }
}

Layout.propTypes = {
  fetchClassifications: PropTypes.func,
  fetchClassification: PropTypes.func,
  fetchCurrentGauge: PropTypes.func,
  classifications: PropTypes.array,
  currentGauge: PropTypes.object,
  currentClassification: PropTypes.object,
  removeClassGaugeProps: PropTypes.func,
  fetchAllClassesBoxPlots: PropTypes.func,
  loading: PropTypes.bool,
  allClassesBoxPlots: PropTypes.object,
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
