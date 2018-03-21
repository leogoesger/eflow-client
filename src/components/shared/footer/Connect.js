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
          <li>
            <a
              className="footer-link"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              className="footer-link"
              href="https://www.youtube.com/channel/UCAZOB4DrcgfBmH3PtySSJew"
              target="_blank"
              rel="noopener noreferrer"
            >
              Youtube
            </a>
          </li>
          <li>
            <a
              className="footer-link"
              href="https://www.researchgate.net/institution/University_of_California_Davis/department/Department_of_Land_Air_and_Water_Resources"
              target="_blank"
              rel="noopener noreferrer"
            >
              ResearchGate
            </a>
          </li>
          <li>
            <a
              className="footer-link"
              href="https://github.com/leogoesger"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
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
    fontSize: '13px',
  },
  list: {
    color: Colors.lightGrey,
  },
};
