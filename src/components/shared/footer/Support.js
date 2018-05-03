import React from 'react';
import {Link} from 'react-router-dom';

import {Colors} from '../../../styles';

export default class Support extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <span>Support</span>
        <ul style={styles.list}>
          <li>
            <Link to="/releases" className="footer-link">
              Realease Notes
            </Link>
          </li>
          <li>
            <Link to="/issues" className="footer-link">
              Known Issues
            </Link>
          </li>
          <li>
            <Link to="/bugReport" className="footer-link">
              Bug Report
            </Link>
          </li>
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
