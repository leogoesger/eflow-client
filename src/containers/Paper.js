import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchPapers} from '../actions/paper';

import Layout from '../components/paper/Layout';

export class Paper extends React.Component {
  componentDidMount() {
    document.title = 'Eflows | Papers';
    this.props.fetchPapers();
  }

  render() {
    return <Layout papers={this.props.papers} />;
  }
}

Paper.propTypes = {
  papers: PropTypes.array,
  fetchPapers: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    papers: state.paper.papers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPapers: () => dispatch(fetchPapers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paper);
