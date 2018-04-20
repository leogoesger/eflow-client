import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchKnownIssues} from '../actions/knownIssue';

import Layout from '../components/knownIssue/Layout';

export class KnownIssue extends React.Component {
  componentWillMount() {
    this.props.fetchKnownIssues();
  }

  render() {
    return (
      <React.Fragment>
        <div style={styles.banner} />
        <Layout knownIssues={this.props.knownIssues} />
      </React.Fragment>
    );
  }
}

KnownIssue.propTypes = {
  knownIssues: PropTypes.array,
  fetchKnownIssues: PropTypes.func,
};

const styles = {
  banner: {
    backgroundColor: '#424242',
    height: '230px',
    zIndex: '0',
  },
};

const mapStateToProps = state => {
  return {
    knownIssues: state.knownIssue.knownIssues,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchKnownIssues: () => dispatch(fetchKnownIssues()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KnownIssue);
