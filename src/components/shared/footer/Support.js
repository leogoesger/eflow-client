import React from 'react';

import { Colors } from '../../../styles';

export default class Support extends React.Component {
  render() {
    return (
      <div
        className="col-lg-3 col-md-3 col-sm-12 col-xs-12"
        style={styles.container}
      >
        <span>Support</span>
        <ul style={styles.list}>
          <li>Contact Support</li>
          <li>Bug Report</li>
          <li>Known Issues</li>
          <li>Realease Notes</li>
        </ul>
      </div>
    );
  }
}

const styles = {
  container: {
    lineHeight: '25px',
    paddingTop: '20px',
    fontSize: '13px',
  },
  list: {
    color: Colors.lightGrey,
  },
};
