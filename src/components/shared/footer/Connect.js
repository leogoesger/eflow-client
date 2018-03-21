import React from 'react';

import {Colors} from '../../../styles';

export default class Connect extends React.Component {
  render() {
    return (
      <div
        className="col-lg-3 col-md-3 col-sm-12 col-xs-12"
        style={styles.container}
      >
        <span>Connect</span>
        <ul style={styles.list}>
          <li>Facebook</li>
          <li>Youtube</li>
          <li>Twitter</li>
          <li>Github</li>
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
