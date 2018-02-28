import React from 'react';

import { Colors } from '../../../styles';

export default class Group extends React.Component {
  render() {
    return (
      <div
        className="col-lg-3 col-md-3 col-sm-12 col-xs-12"
        style={styles.container}
      >
        <span>UCD Water Management Lab</span>
        <ul style={styles.list}>
          <li>Projects</li>
        </ul>
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
    fontSize: '16px',
  },
  list: {
    color: Colors.lightGrey,
  },
};
