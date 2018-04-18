import React from 'react';

import {Colors} from '../../../styles';

export default class Group extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <a
          className="footer-link"
          href="https://watermanagement.ucdavis.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>UCD Water Management Lab</span>
        </a>
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
