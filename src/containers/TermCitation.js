import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Layout from '../components/term/Layout';

class TermCitation extends React.Component {
  componentDidMount() {
    document.title = 'eFlows | Terms';
  }

  render() {
    return (
      <React.Fragment>
        <div style={styles.banner} />
        <Layout version={this.props.releaseNotes[0].version} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    releaseNotes: state.releaseNote.releaseNotes,
  };
};

TermCitation.propTypes = {
  releaseNotes: PropTypes.array,
};

const styles = {
  banner: {
    backgroundColor: '#424242',
    height: '230px',
    zIndex: '0',
  },
};

export default connect(mapStateToProps, null)(TermCitation);
