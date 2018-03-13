import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchClassification} from '../actions/classification';
import {fetchGauges} from '../actions/gauge';
import Layout from '../components/hydrology/Layout';

export class Hydrology extends React.Component {
  componentWillMount() {
    this.props.fetchGauges();
  }

  render() {
    return (
      <Layout
        gauges={this.props.gauges}
        classifications={this.props.classifications}
        currentClassification={this.props.currentClassification}
        fetchClassification={classId => this.props.fetchClassification(classId)}
      />
    );
  }
}

Hydrology.propTypes = {
  fetchClassification: PropTypes.func,
  fetchGauges: PropTypes.func,
  gauges: PropTypes.array,
  classifications: PropTypes.object,
  currentClassification: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    gauges: state.gauge.gauges,
    classifications: state.classification.classifications,
    currentClassification: state.classification.string,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchClassification: classId => dispatch(fetchClassification(classId)),
    fetchGauges: () => dispatch(fetchGauges()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hydrology);
