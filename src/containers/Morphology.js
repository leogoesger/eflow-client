import React from 'react';

import Layout from '../components/morphology/Layout';

export class Morphology extends React.Component {
  render() {
    return (
      <div>
        <div style={styles.banner} />
        <Layout />
      </div>
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

export default Morphology;
