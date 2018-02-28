import React from 'react';
import FlatButton from 'material-ui/FlatButton';

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
              <span style={{ lineHeight: '55px', marginRight: '40px' }}>
                {'eflow'}
              </span>
            </div>
            <FlatButton
              className="e2e-header-sign-up-btn"
              label="Hydrology"
              style={styles.headerButton}
              labelStyle={styles.headerWhiteButtonLabel}
              hoverColor={'rgba(12, 12, 12, 0.1)'}
              onClick={() => navigateTo('/hydrology')}
            />
            <FlatButton
              className="e2e-header-sign-up-btn"
              label="Morphlogy"
              style={styles.headerButton}
              labelStyle={styles.headerWhiteButtonLabel}
              hoverColor={'rgba(12, 12, 12, 0.1)'}
              onClick={() => navigateTo('/morphology')}
            />
            <FlatButton
              className="e2e-header-sign-up-btn"
              label="Function"
              style={styles.headerButton}
              labelStyle={styles.headerWhiteButtonLabel}
              hoverColor={'rgba(12, 12, 12, 0.1)'}
              onClick={() => navigateTo('/function')}
            />
          </div>
          <NavRight />
        </div>
      </div>
    );
  }
}

const styles = {
  nav: {
    backgroundColor: Colors.white,
    position: 'fixed',
    top: '0',
    width: '100%',
    height: '60px',
    zIndex: '9',
    boxShadow: '-2px 9px 6px -6px #bdbdbd',
  },
  container: {
    margin: '0 auto',
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    fontFamily: 'Comic Sans MS',
    color: Colors.grey,
    fontSize: '22px',
    cursor: 'pointer',
  },
  navItem: {
    marginLeft: '20px',
    color: Colors.grey,
    fontSize: Theme.buttonLabelSmall,
    cursor: 'pointer',
    zIndex: 99,
  },
  headerButton: {
    height: '36px',
    marginTop: '10px',
    marginRight: '10px',
    color: Colors.grey,
    borderRadius: Theme.buttonBorderRadius,
  },
  headerWhiteButtonLabel: {
    marginLeft: '2px',
    marginRight: '5px',
    textTransform: 'none',
    color: Colors.grey,
    fontSize: Theme.buttonLabelSmall,
  },
};

Layout.propTypes = {};
