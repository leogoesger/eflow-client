import React from 'react';
import Layout from '../components/term/Layout';

class TermCitation extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div style={styles.banner} />
        <Layout />
      </React.Fragment>
    );
  }
}

const styles = {
  banner: {
    backgroundColor: '#424242',
    height: '230px',
    zIndex: '0',
  },
};

export default TermCitation;
