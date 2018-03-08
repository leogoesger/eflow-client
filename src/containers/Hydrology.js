import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchClassifications} from '../actions/classification';
import Layout from '../components/hydrology/Layout';

export class Hydrology extends React.Component {
  render() {
    return <Layout gauges={this.props.gauges} />;
  }
}

Hydrology.propTypes = {
  fetchClassifications: PropTypes.func,
  gauges: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    gauges: state.gauge.gauges,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchClassifications: () => dispatch(fetchClassifications()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hydrology);
