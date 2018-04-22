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
      return <MetricOverviewCard />;
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <MetricNavbar />
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
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '-60px auto 100px auto',
    height: '100%',
    width: '1200px',
  },
};
