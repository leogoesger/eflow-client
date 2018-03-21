import React from 'react';

import {Colors} from '../../../styles';

export default class Learn extends React.Component {
  render() {
    return (
      <div
        className="col-lg-3 col-md-3 col-sm-12 col-xs-12"
        style={styles.container}
      >
        <span>Learn</span>
        <ul style={styles.list}>
          <li>Guide</li>
          <li>Reference</li>
          <li>Hydrology</li>
          <li>Morphology</li>
          <li>Ecology</li>
        </ul>
      </div>
    );
  }
}

const styles = {
  container: {
    lineHeight: '25px',
    paddingTop: '20px',
    paddingLeft: '40px',
    fontSize: '13px',
  },
  list: {
    color: Colors.lightGrey,
  },
};
