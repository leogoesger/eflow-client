import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatButton,
  IconMenu,
  MenuItem,
  IconButton,
  Divider,
} from 'material-ui';

import { Colors, Theme } from '../../../styles';
import { navigateTo } from '../../../utils/helpers';
import NavRight from './NavRight';
import Build from 'material-ui/svg-icons/action/build';
import More from 'material-ui/svg-icons/navigation/arrow-drop-down';

export default class Layout extends React.Component {
  _navigateTo(url) {
    if (this.props.annualFlowData && this.props.annualFlowData.Gauge) {
      this.props.fetchCurrentGauge(this.props.annualFlowData.Gauge.id);
    }
    navigateTo(url);
  }

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
            style={{ width: '14px', height: '14px', marginRight: '2px' }}
          />
          <div>
            beta-
            {this.props.releaseNoteVersion}
          </div>
        </div>
      );
    }
  }

  renderOptions() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <More color="rgba(0, 0, 0, 0.60)" />
          </IconButton>
        }
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem
          value="0"
          primaryText="Overview"
          onClick={() => navigateTo('/hydrology')}
        />
        <Divider />
        <MenuItem
          value="2"
          primaryText="Annual Metrics"
          onClick={() => navigateTo('/metricDetail')}
        />
      </IconMenu>
    );
  }

  render() {
    return (
      <div style={styles.nav}>
        <div style={styles.container}>
          <div style={styles.logo} className="tour-logo">
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
            <div>
              <FlatButton
                className="tour-hydrology"
                label="Hydrology"
                style={styles.headerButton}
                labelStyle={styles.headerWhiteButtonLabel}
                hoverColor={'white'}
                onClick={() => this._navigateTo('/hydrology')}
              />
              <div
                style={{
                  zIndex: '1',
                  position: 'relative',
                  top: '-41px',
                  right: '-75px',
                }}
              >
                {this.renderOptions()}
              </div>
            </div>
            <FlatButton
              className="e2e-header-sign-up-btn"
              label="Geomorphology"
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
          <NavRight
            currentUser={this.props.currentUser}
            removeUser={this.props.removeUser}
          />
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
    minWidth: '1300px',
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
  fetchCurrentGauge: PropTypes.func,
  annualFlowData: PropTypes.object,
  currentUser: PropTypes.object,
  removeUser: PropTypes.func,
};
