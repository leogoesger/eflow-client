import React from 'react';

import {Colors} from '../../../styles';

export default class Group extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <p
          className="footer-link"
          style={{cursor: 'pointer'}}
          onClick={() =>
            (window.location.href = 'http://watermanagement.ucdavis.edu/')
          }
        >
          UCD Water Management Lab
        </p>
      </div>
    );
  }
}

const styles = {
  container: {
    background: '#616161',
    lineHeight: '25px',
    height: '200px',
    paddingTop: '20px',
    paddingLeft: '20px',
    fontSize: '16px',
    width: '20%',
  },
  list: {
    color: Colors.lightGrey,
  },
};
