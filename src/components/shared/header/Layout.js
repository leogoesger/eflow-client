import React from 'react';

import { Colors, Theme } from '../../../styles';
import { navigateTo } from '../../../utils/helpers';
import NavRight from './NavRight';

export default class Layout extends React.Component {
  render() {
    return (
      <div style={styles.nav}>
        <div style={styles.container}>
          <div className="row" style={{ margin: '0px' }}>
            <div style={styles.logo} onClick={() => navigateTo('/')}>
              <span style={{ lineHeight: '55px', marginRight: '20px' }}>
                {'eflow'}
              </span>
            </div>
            <div
              style={styles.navItem}
              onClick={() => navigateTo('/hydrology')}
            >
              <span style={{ lineHeight: '60px', marginRight: '20px' }}>
                {'Hydology'}
              </span>
            </div>
            <div
              style={styles.navItem}
              onClick={() => navigateTo('/morphlogy')}
            >
              <span style={{ lineHeight: '60px', marginRight: '20px' }}>
                {'Morphlogy'}
              </span>
            </div>
            <div style={styles.navItem} onClick={() => navigateTo('/function')}>
              <span style={{ lineHeight: '60px', marginRight: '20px' }}>
                {'Function'}
              </span>
            </div>
          </div>
          <NavRight />
        </div>
      </div>
    );
  }
}

const styles = {
  nav: {
    backgroundColor: Colors.blue,
    position: 'fixed',
    top: '0',
    width: '100%',
    height: '60px',
    zIndex: '99',
  },
  container: {
    margin: '0 auto',
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    fontFamily: 'Comic Sans MS',
    color: Colors.white,
    fontSize: '22px',
    cursor: 'pointer',
  },
  navItem: {
    marginLeft: '20px',
    fontSize: Theme.buttonLabelSmall,
    color: Colors.white,
    cursor: 'pointer',
    zIndex: 99,
  },
};

Layout.propTypes = {};
