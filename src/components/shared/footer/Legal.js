import React from 'react';
import {Link} from 'react-router-dom';
import {Colors} from '../../../styles';

export default class Legal extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <Link to="/terms" style={styles.term}>
          {'Terms | Citation'}
        </Link>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    position: 'absolute',
    bottom: '0px',
    color: '#fff',
    width: '100%',
    height: '34px',
    backgroundColor: '#313C42',
  },
  term: {color: Colors.white, textDecoration: 'none', paddingLeft: '40px'},
};
