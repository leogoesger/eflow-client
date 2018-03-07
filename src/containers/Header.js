import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Layout from '../components/shared/header/Layout';
import {fetchGauges} from '../actions/gauge';

class Header extends React.Component {
  render() {
    return <Layout />;
  }

  componentWillMount() {
    this.props.fetchGauges();
  }
}

const mapStateToProps = state => {
  return {
    gauges: state.gauge.gauges,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGauges: () => dispatch(fetchGauges()),
  };
};

Header.propTypes = {
  fetchGauges: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
