import React from 'react';
import {Colors} from '../../../styles';

import Learn from './Learn';
import Connect from './Connect';
import Support from './Support';
import Group from './Group';
import Legal from './Legal';

export default class Layout extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.left}>
          <Learn />
          <Connect />
          <Support />
          <Group />
        </div>
        <Legal />
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    color: '#fff',
    marginTop: '50px',
    minHeight: '220px',
    width: '100%',
    backgroundColor: Colors.offBlack,
  },
  left: {
    display: 'flex',
    justifyContent: 'center',
  },
};
