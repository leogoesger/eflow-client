import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchReleaseNotes} from '../actions/releaseNote';

import Layout from '../components/releaseNote/Layout';

export class ReleaseNote extends React.Component {
  componentWillMount() {
    this.props.fetchReleaseNotes();
  }

  render() {
    return (
      <React.Fragment>
        <div style={styles.banner} />
        <Layout releaseNotes={this.props.releaseNotes} />
      </React.Fragment>
    );
  }
}

ReleaseNote.propTypes = {
  releaseNotes: PropTypes.array,
  fetchReleaseNotes: PropTypes.func,
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
    releaseNotes: state.releaseNote.releaseNotes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReleaseNotes: () => dispatch(fetchReleaseNotes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseNote);
