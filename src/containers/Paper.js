import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../components/paper/Layout';

export class Paper extends React.Component {
  render() {
    return <Layout />;
  }
}

Paper.propTypes = {};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Paper);
