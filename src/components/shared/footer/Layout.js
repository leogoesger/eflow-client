import React from 'react';
import { Colors } from '../../../styles';

export default class Layout extends React.Component {
  render() {
    return <div style={styles.container}>{'something'}</div>;
  }
}

const styles = {
  container: {
    marginTop: '50px',
    minHeight: '100px',
    width: '100%',
    backgroundColor: Colors.offBlack,
  },
};
