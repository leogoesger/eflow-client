import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Layout from '../components/releaseNote/Layout';

class ReleaseNote extends React.Component {
  componentDidMount() {
    document.title = 'Eflows | Releases';
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

export default connect(mapStateToProps, null)(ReleaseNote);
