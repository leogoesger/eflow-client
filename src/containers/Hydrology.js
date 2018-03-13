import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  fetchClassification,
  updateCurrentClass,
} from '../actions/classification';
import {fetchGauges, updateCurrentGauge} from '../actions/gauge';
import Layout from '../components/hydrology/Layout';

export class Hydrology extends React.Component {
  componentWillMount() {
    this.props.fetchGauges();
  }

  render() {
    return (
      <Layout
        gauges={this.props.gauges}
        currentGauge={this.props.currentGauge}
        updateCurrentGauge={gaugeId => this.props.updateCurrentGauge(gaugeId)}
        classifications={this.props.classifications}
        currentClassification={this.props.currentClassification}
        fetchClassification={classId => this.props.fetchClassification(classId)}
        updateCurrentClass={classId => this.props.updateCurrentClass(classId)}
      />
    );
  }
}

Hydrology.propTypes = {
  fetchClassification: PropTypes.func,
  updateCurrentClass: PropTypes.func,
  fetchGauges: PropTypes.func,
  gauges: PropTypes.array,
  updateCurrentGauge: PropTypes.func,
  currentGauge: PropTypes.number,
  classifications: PropTypes.object,
  currentClassification: PropTypes.number,
};

const mapStateToProps = state => {
  return {
    gauges: state.gauge.gauges,
    currentGauge: state.gauge.currentGauge,
    classifications: state.classification.classifications,
    currentClassification: state.classification.currentClassification,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchClassification: classId => dispatch(fetchClassification(classId)),
    updateCurrentClass: classId => dispatch(updateCurrentClass(classId)),
    fetchGauges: () => dispatch(fetchGauges()),
    updateCurrentGauge: gaugeId => dispatch(updateCurrentGauge(gaugeId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hydrology);
