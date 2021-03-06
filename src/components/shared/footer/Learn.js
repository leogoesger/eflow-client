import React from 'react';
import { Link } from 'react-router-dom';

import { Colors } from '../../../styles';

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
              Geomorphology
            </Link>
          </li>
          <li>
            <Link to="/ecology" className="footer-link">
              Ecology
            </Link>
          </li>
          <li>
            <Link to="/papers" className="footer-link">
              Papers
            </Link>
          </li>
          <li>
            <a
              href="https://eflows.gitbook.io/project/website_summary"
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
