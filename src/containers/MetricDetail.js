import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  fetchClassification,
  fetchClassifications,
  removeCurrentClass,
} from '../actions/classification';
import {fetchCurrentGauge, removeCurrentGauge} from '../actions/gauge';
import {fetchAllClassesBoxPlots} from '../actions/metricDetail';
import Layout from '../components/metricDetail/Layout';
import ErrorBoundary from '../components/shared/ErrorBoundary';

export class MetricDetail extends React.Component {
  componentWillMount() {
    if (!this.props.classifications) {
      this.props.fetchClassifications();
      this.props.fetchAllClassesBoxPlots();
    }
  }

  removeClassGaugeProps() {
    this.props.removeCurrentGauge();
    this.props.removeCurrentClass();
  }

  render() {
    return (
      <React.Fragment>
        <div style={styles.banner} />
        <ErrorBoundary>
          <Layout
            currentGauge={this.props.currentGauge}
            classifications={this.props.classifications}
            fetchCurrentGauge={gaugeId => this.props.fetchCurrentGauge(gaugeId)}
            currentClassification={this.props.currentClassification}
            fetchClassification={classId =>
              this.props.fetchClassification(classId)
            }
            removeClassGaugeProps={() => this.removeClassGaugeProps()}
          />
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}

MetricDetail.propTypes = {
  removeCurrentGauge: PropTypes.func,
  removeCurrentClass: PropTypes.func,
  fetchClassifications: PropTypes.func,
  fetchAllClassesBoxPlots: PropTypes.func,
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
    removeCurrentGauge: () => dispatch(removeCurrentGauge()),
    removeCurrentClass: () => dispatch(removeCurrentClass()),
    fetchAllClassesBoxPlots: () => dispatch(fetchAllClassesBoxPlots()),
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
