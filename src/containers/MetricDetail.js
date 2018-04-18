import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  fetchClassification,
  fetchClassifications,
} from '../actions/classification';
import {fetchCurrentGauge} from '../actions/gauge';
import Layout from '../components/metricDetail/Layout';

export class MetricDetail extends React.Component {
  render() {
    return (
      <div>
        <div style={styles.banner} />
        <Layout
          currentGauge={this.props.currentGauge}
          classifications={this.props.classifications}
          fetchCurrentGauge={gaugeId => this.props.fetchCurrentGauge(gaugeId)}
          currentClassification={this.props.currentClassification}
          fetchClassification={classId =>
            this.props.fetchClassification(classId)
          }
        />
      </div>
    );
  }
}

MetricDetail.propTypes = {
  fetchClassifications: PropTypes.func,
  fetchClassification: PropTypes.func,
  fetchCurrentGauge: PropTypes.func,
  classifications: PropTypes.array,
  currentGauge: PropTypes.object,
  currentClassification: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    classifications: state.classification.classifications,
    currentClassification: state.classification.currentClassification,
    currentGauge: state.gauge.currentGauge,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchClassifications: () => dispatch(fetchClassifications()),
    fetchClassification: classId => dispatch(fetchClassification(classId)),
    fetchCurrentGauge: gaugeId => dispatch(fetchCurrentGauge(gaugeId)),
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