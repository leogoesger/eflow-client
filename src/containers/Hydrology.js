import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  fetchClassification,
  updateCurrentClass,
} from '../actions/classification';
import {fetchGauges, fetchCurrentGauge} from '../actions/gauge';
import Layout from '../components/hydrology/Layout';

export class Hydrology extends React.Component {
  componentWillMount() {
    this.props.fetchGauges();
  }

  _getCurrentClassObject(classes, classId) {
    if (classes) {
      if (Object.keys(classes).includes(`class${classId}`)) {
        return classes[`class${classId}`];
      }
    } else {
      return null;
    }
  }

  render() {
    const currentClassObject = this._getCurrentClassObject(
      this.props.classifications,
      this.props.currentClassification
    );
    return (
      <Layout
        gauges={this.props.gauges}
        currentGauge={this.props.currentGauge}
        classifications={this.props.classifications}
        fetchCurrentGauge={gaugeId => this.props.fetchCurrentGauge(gaugeId)}
        currentClassification={currentClassObject}
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
  fetchCurrentGauge: PropTypes.func,
  gauges: PropTypes.array,
  currentGauge: PropTypes.object,
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
    fetchCurrentGauge: gaugeId => dispatch(fetchCurrentGauge(gaugeId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hydrology);
