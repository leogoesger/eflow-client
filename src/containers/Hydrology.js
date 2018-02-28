import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../components/home/Layout';

export class Hydrology extends React.Component {
  render() {
    return <Layout text={'Hello world!'} />;
  }
}

Hydrology.propTypes = {};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Hydrology);
