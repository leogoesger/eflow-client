import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'material-ui';
import { Link } from 'react-router-dom';
import Hydrograph from './Hydrograph';
import Divider from 'material-ui/Divider';
import Chart from 'material-ui/svg-icons/editor/show-chart';
import DRH from 'material-ui/svg-icons/editor/format-line-spacing';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import ViewDay from 'material-ui/svg-icons/action/view-day';

import MetricCard from './MetricCard';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadDRH: true,
      loadAFP: false,
      loadBP: false,
    };
  }

  _updateHoverGauge(gaugeId) {
    this.props.updateHoveredGauge(
      this.props.gauges.find(gauge => gauge.id === gaugeId)
    );
  }

  onClickHandler(e) {
    const resetStates = {
      loadDRH: false,
      loadAFP: false,
      loadBP: false,
    };

    resetStates[e] = true;

    this.setState(resetStates);
  }

  _handleChange(v, field) {
    if (field === 'classId') {
      return this.setState({ [field]: v + 1 });
    }
    return this.setState({ [field]: v });
  }

  renderClicked(clicked) {
    if (clicked.loadDRH) {
      return (
        <Hydrograph
          data={this.props.data}
          fetchCurrentGauge={this.props.fetchCurrentGauge}
          gauges={this.props.gauges}
          currentGauge={this.props.currentGauge}
          currentClassification={this.props.currentClassification}
          removeClassGaugeProps={this.props.removeClassGaugeProps}
          classifications={this.props.classifications}
          fetchClassification={this.props.fetchClassification}
          updateHoveredGauge={gaugeId => this._updateHoverGauge(gaugeId)}
        />
      );
    }
    if (clicked.loadAFP) {
      return <MetricCard data={this.props.data} />;
    }
    if (clicked.loadBP) {
      return (
        <h1 style={{ height: '570px', margin: 'auto' }}>
          New Feature Coming Soon!
        </h1>
      );
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <div style={styles.banner} />
        <div style={styles.paperStyle}>
          <div
            style={{
              width: '20%',
              height: '100%',
            }}
          >
            <div
              style={{
                height: '640px',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}
            >
              <div>
                <MenuItem
                  primaryText={this.props.data.name}
                  value={0}
                  disabled={true}
                  style={{ fontWeight: 'bold', color: 'black' }}
                />
                <Divider style={{ width: '98%' }} />
                <MenuItem
                  primaryText="DRH"
                  value={'drh'}
                  leftIcon={<DRH />}
                  style={this.state.loadDRH ? styles.selectedMenu : null}
                  onClick={() => this.onClickHandler('loadDRH')}
                />

                <Divider style={{ width: '98%' }} />
                <MenuItem
                  primaryText="Annual Flow Plot"
                  value={'afp'}
                  leftIcon={<Chart />}
                  style={this.state.loadAFP ? styles.selectedMenu : null}
                  onClick={() => this.onClickHandler('loadAFP')}
                />
                <Divider style={{ width: '98%' }} />
                <MenuItem
                  primaryText="Box Plots"
                  value={'bp'}
                  leftIcon={<ViewDay />}
                  style={this.state.loadBP ? styles.selectedMenu : null}
                  onClick={() => this.onClickHandler('loadBP')}
                />
                <Divider style={{ width: '98%' }} />
              </div>

              <div>
                <Divider style={{ width: '98%' }} />
                <Link to={'/profile'}>
                  <MenuItem
                    primaryText="Back"
                    value={'bp'}
                    leftIcon={<Back />}
                  />
                </Link>
              </div>
            </div>
          </div>

          <div
            style={{
              width: '80%',
              margin: '0 auto',
              boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px',
            }}
          >
            <div
              style={{
                width: '90%',
                margin: '30px auto',
                position: 'relative',
              }}
            >
              {this.renderClicked(this.state)}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  data: PropTypes.object,
  currentClassification: PropTypes.object,
  currentGauge: PropTypes.object,
  gauges: PropTypes.array,
  fetchCurrentGauge: PropTypes.func,
  removeClassGaugeProps: PropTypes.func,
  classifications: PropTypes.array,
  fetchClassification: PropTypes.func,
  updateHoveredGauge: PropTypes.func,
};

const styles = {
  banner: {
    backgroundColor: '#424242',
    height: '230px',
    zIndex: '0',
  },
  paperStyle: {
    display: 'flex',
    justifyContent: 'space-around',
    height: '100%',
    margin: '-60px auto 100px auto',
    backgroundColor: 'white',
    width: '1100px',
    zIndex: '2',
    overflow: 'scroll',
  },
  selectedMenu: {
    borderRightStyle: 'solid',
    borderWidth: '3px',
    marginRight: '5px',
    borderColor: 'rgba(0, 188, 212, 0.5)',
  },
};

export default Layout;
