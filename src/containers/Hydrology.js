import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchClassifications} from '../actions/classification';
import Layout from '../components/hydrology/Layout';

export class Hydrology extends React.Component {
  componentWillMount() {
    this.props.fetchClassifications();
  }

  render() {
    return <Layout classifictions={this.props.classifictions} />;
  }
}

Hydrology.propTypes = {
  fetchClassifications: PropTypes.func,
  classifictions: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    classifictions: state.classification.classes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchClassifications: () => dispatch(fetchClassifications()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hydrology);
