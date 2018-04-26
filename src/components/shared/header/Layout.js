import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

import {Colors, Theme} from '../../../styles';
import {navigateTo} from '../../../utils/helpers';
import NavRight from './NavRight';
import Build from 'material-ui/svg-icons/action/build';

export default class Layout extends React.Component {
  _renderBeta() {
    if (this.props.releaseNoteVersion) {
      return (
        <div
          style={styles.beta}
          className="animated bounceIn betaIcon"
          onClick={() => navigateTo('/releases')}
        >
          <Build
            color={'#ef5350'}
            style={{width: '14px', height: '14px', marginRight: '2px'}}
          />
          <div>beta-{this.props.releaseNoteVersion}</div>
        </div>
      );
    }
  }

  render() {
    return (
      <div style={styles.nav}>
        <div style={styles.container}>
          <div style={styles.logo}>
            <span
              style={{
                lineHeight: '55px',
                marginRight: '40px',
                cursor: 'pointer',
              }}
              onClick={() => navigateTo('/')}
            >
              {'eFlows'}
            </span>
            {this._renderBeta()}
          </div>
          <div
            style={{
              width: '35%',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <FlatButton
              className="e2e-header-sign-up-btn"
              label="Hydrology"
              style={styles.headerButton}
              labelStyle={styles.headerWhiteButtonLabel}
              hoverColor={'white'}
              onClick={() => navigateTo('/hydrology')}
            />
            <FlatButton
              className="e2e-header-sign-up-btn"
              label="Morphlogy"
              style={styles.headerButton}
              labelStyle={styles.headerWhiteButtonLabel}
              hoverColor={'white'}
              onClick={() => navigateTo('/morphology')}
            />
            <FlatButton
              className="e2e-header-sign-up-btn"
              label="Ecology"
              style={styles.headerButton}
              labelStyle={styles.headerWhiteButtonLabel}
              hoverColor={'white'}
              onClick={() => navigateTo('/ecology')}
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
    width: '95%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    fontFamily: 'sans-serif',
    marginTop: '2px',
    color: Colors.grey,
    fontWeight: '600',
    fontSize: '22px',
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
  beta: {
    position: 'relative',
    top: '-45px',
    left: '70px',
    color: '#ef5350',
    fontSize: '14px',
    display: 'flex',
    cursor: 'pointer',
  },
};

Layout.propTypes = {
  releaseNoteVersion: PropTypes.string,
};
