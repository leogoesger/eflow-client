import React from 'react';
import {Link} from 'react-router-dom';

import {Colors} from '../../../styles';

export default class Learn extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <span>Learn</span>
        <ul style={styles.list}>
          <li>
            <Link to="/hydrology" className="footer-link">
              Hydrology
            </Link>
          </li>
          <li>
            <Link to="/morphology" className="footer-link">
              Morphology
            </Link>
          </li>
          <li>
            <Link to="/ecology" className="footer-link">
              Ecology
            </Link>
          </li>
          <li>
            <Link to="/paper" className="footer-link">
              Paper
            </Link>
          </li>
          <li>
            <a
              href="https://leogoesger.gitbooks.io/funflow/content/"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reference
            </a>
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
    paddingLeft: '40px',
    fontSize: '13px',
  },
  list: {
    color: Colors.lightGrey,
  },
};
