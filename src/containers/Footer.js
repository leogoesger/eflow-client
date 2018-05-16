import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Layout from '../components/shared/footer/Layout';

class Footer extends React.Component {
  render() {
    return <Layout version={this.props.releaseNotes[0].version} />;
  }
}

const mapStateToProps = state => {
  return {
    releaseNotes: state.releaseNote.releaseNotes,
  };
};

Footer.propTypes = {
  releaseNotes: PropTypes.array,
};

export default connect(mapStateToProps, null)(Footer);
